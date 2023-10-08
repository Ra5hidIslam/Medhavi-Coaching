const router = require("express").Router();
const feedModel = require("../models/feed/feedModel");
const feedInteractionModel = require("../models/feed/feedInteractionModel");
const feedResultModel = require("../models/feed/feedResultModel");
const verifyJWT = require('../middleware/verifyJWT');
const userModel = require("../models/user/userModel")


// HELPER FUNCTIONS

// helper function to get the feed from timeline of follower
const  getFeedFromDB = async(timeline)=>{
    // run a for loop to get the feed and them sort them in chronological order
    const feed = [];
    try{
        for(let i = 0; i<timeline.length; i++){
            const foundFeed = await feedModel.findOne({_id:timeline[i]['feedId']});
            feed.push(foundFeed);
        }
    }catch(err){
        return err.message;
    }
    return feed;
}


async function getSelfFeedsFromUsers(ID){
    let feed = [];
    try{
        feed = await feedModel.find({userId:ID});
        return feed;
    }catch(err){
        return err.message
    }
    
    
}

async function feedSelector(examType,subType,topicType,feedCount){
    // get the feed and sort them by time(latest first).
    if(subType){
        if(topicType){
            const allFeeds = feedModel.find({examType:examType,subType:subType,topicType:topicType}).sort({createdAt:-1}).limit(feedCount);
            // return allFeeds.lean.slice(0,feedCount);
            return allFeeds;
        }
        else{
            // const allFeeds = feedModel.find({'examType':examType},{'subType':subType}).sort({createdAt:-1}).limit(feedCount);
            const allFeeds = feedModel.find({examType:examType,subType:subType}).sort({createdAt:-1});
            // return allFeeds.lean.slice(0,feedCount);
            return allFeeds;
        }
        

    }
    else{
        const allFeeds = feedModel.find({'examType':examType}).sort({createdAt:-1});
        return allFeeds.slice(0,feedCount);
    }
    // console.log("allfeeds",allFeeds);
    
}

async function getFeedInteraction(feed){
    const feedInteraction = []
    for (let i = 0;i < feed.length;i++){
        const currentInteraction = await feedInteractionModel.findOne({'feedId':feed[i]._id})
        feedInteraction.concat(currentInteraction);
    }
    return feedInteraction;
}


// Add feed
router.post("/create",verifyJWT, async (req,res)=>{
    try{
        // creating new feed 
        const newFeed = new feedModel({
            questionTitle:req.body.questionTitle,
            questionType:req.body.questionType,
            questionOptions:req.body.questionOptions,
            questionAnswer:req.body.questionAnswer,
            questionAnswerNum:req.body.questionAnswerNum,
            examType:req.body.examType,
            subType:req.body.subType,
            topicType:req.body.topicType,
            // userId:req.body.userId,
            // userName:req.body.userName,
        });
        // save feed and respond
        const feed = await newFeed.save();
        // add the feed in the timelines of the followers
        // const foundUser = await userModel.findOne({_id:req.body.userId});
        // if(!foundUser) return res.status(403).json("user not found");
        // const followers = foundUser.followers;
        // for(let i = 0;i<followers.length;i++){
        //     // update all the user's timeline object
        //     // get the user
        //     const currentUser = await userModel.findOne({_id:followers[i]});
        //     await currentUser.updateOne({$push:{timeline:{feedId:feed._id,
        //                                                   userId:req.body.userId
        //                                                 }
        //                                         }
        //                                 });
        // }
        res.status(200).json(feed);
    } catch(err){
        res.status(401).json(err.message);
    }
});

// Update Feed
router.put("/updateFeed/:feedId",verifyJWT, async (req,res)=>{
    // check if feed exist using feed id
    const feedId = req.params.feedId;
    if(!feedId) return res.status(403).json("feed id not received");
    const foundFeed = await feedModel.findOne({_id:feedId});
    if(!foundFeed) return res.status(403).json("feed not found");
    await foundFeed.updateOne({$set:req.body});
    res.status(200).json("Feed Updated");
    
});

// delete feed
router.put("/deleteFeed/:feedId",verifyJWT, async (req,res)=>{
    // check if feed exist using feed id
    const feedId = req.params.feedId;
    if(!feedId) return res.status(403).json("feed id not received");
    const foundFeed = await feedModel.findOne({_id:feedId});
    if(!foundFeed) return res.status(403).json("feed not found");
    // delete the feed from the timeline too of ther followers
    // const foundUser = await userModel.findOne({_id:foundFeed.userId});
    // if(!foundUser) return res.status(403).json("id not received in feed");
    // try{
    //     const followers = foundUser.followers;
    //     for(let i = 0;i<followers.length;i++){
    //         let currentUser = await userModel.findOne({_id:followers[i]});
    //         currentUser.updateOne({},
    //             {$pull:{timeline:{feedId:req.params.feedId}}},
    //             {multi:true})
    //     }
    // }catch(err){
    //     return res.status(403).json(err.message)
    // }
    // Finally Delete the feed
    await foundFeed.deleteOne({$set:req.body});
    res.status(200).json("Feed Deleted");
    
});

// get a particular feed
router.get("/getOneFeed/:feedId",verifyJWT, async (req,res)=>{
    // check if feed exist using feed id
    const feedId = req.params.feedId;
    if(!feedId) return res.status(403).json("feed id not received");
    // find the feed based on the feed id
    const foundFeed = await feedModel.findOne({_id:feedId});
    if(!foundFeed) return res.status(403).json("feed not found");
    // return the feed
    res.status(200).json(foundFeed);
    
});


// Get home feed 
//  two ways to get the homefeed(algo for now), if the user is following others then show them first then fill the box with other posts
// While Getting home feed get the feed interaction data too and send it back.
router.get("/getHomeFeed/:userId/:examType/:subType/",verifyJWT, async (req,res)=>{
    // check if feed exist using feed id
    // console.log(req.body.data);
    if(req.params.userId === "undefined" || req.params.userId === null) return res.sendStatus(403);
    const userId = req.params.userId;
    if(!userId) return res.status(403).json("user id not received");
    // find the user and the following list
    const foundUser = await userModel.findOne({_id:userId});
    if(!foundUser) return res.status(403).json("user not found");
    // get the timeline object from the user
    const timeline = foundUser.timeline;
    // console.log("Length of timeline",Object.keys(timeline).length);
    // if(timeline == undefined){
    //     console.log("RUnning option1");
    //     // get feed from feed lists by sorting on timeline
    if(!req.params.examType) return res.status(403).json("exam type not provided");
    let feed = await feedSelector(req.params.examType,req.params.subType,req.params.topicType,15);
    console.log(feed);
    const feedInteraction = await getFeedInteraction(feed);
    feed =  {"feed":feed,"feedInteraction":feedInteraction};
    console.log(feed);
    res.status(200).json(feed);    
    // }
    //     // get the feed from the timeline
    // const feed = await getFeedFromUsers(timeline);
    // console.log("First promise");
    // res.status(200).json(feed);    
    
    
});


// //get userfeed
// router.get("/getUserFeed/:userId",async (req,res)=>{
//     // check if feed exist using feed id
//     if(req.params.userId === "undefined" || req.params.userId === null) return res.sendStatus(403);
//     const userId = req.params.userId;
//     if(!userId) return res.status(403).json("user id not received");
//     // find the user and the following list
//     const feed = await getSelfFeedsFromUsers(userId);
//     res.status(200).json(feed);
    
// });



// Add feedResult
router.put("/feedresult/:id",verifyJWT,async (req,res)=>{
    // check is the user and feed exist first
    try{

        const userSel = req.body.userSelection ? req.body.userSelection:undefined;
        const userAns = req.body.userAnswer ? req.body.userAnswer:undefined;
        const userFound = await userModel.findOne({_id:req.body.userId});
        const feedFound = await feedModel.findById(req.params.id);
        // console.log("user",userFound);
        // console.log("feed",feedFound);
        if(userFound && feedFound){
            
            const feedResult = await feedResultModel.findOne({"feedId":req.params.id});
            console.log("feedResult:",feedResult);
            if(feedResult){
                
                await feedResult.updateOne({$set:req.body});
                console.log("feed updated");
                res.status(200).json("Feed Updated");
            }
            else{
                const newFeedResult = new feedResultModel({
                    feedId:req.params.id,
                    userId:req.body.userId,
                    userSelection:userSel,
                    userAnswer:userAns,
                });
                // save user and respond
                
                const createdFeedResult = await newFeedResult.save();
                console.log("newfeedResult:",createdFeedResult);
                res.status(200).json(createdFeedResult);
            }
            
        }
        else{
            res.status(500).json("User or feed not found")
            // create the object

        }
    }catch(err){
        console.log(err);
    }
});


// // Add feedInteraction
// router.put("/feedinteraction",verifyJWT, async (req,res)=>{
//     try{
//         // check if the feed interaction table for the feed is already there
//         // interfile = await feedInteractionModel.findOne({"feedId":req.body.feedId});
//         // res.status(500).json(interfile);
//         const currentFeed = await feedInteractionModel.findOne({"feedId":req.body.feedId});
//         if(currentFeed){
//             const comment_status = req.body.commentStatus;
//             const like_status = req.body.likeStatus;
//             const feedStatus = req.body.feedStatStatus;
//             // res.status(500).json("feed found");
//             if(comment_status){
//                 await currentFeed.updateOne({"$push":{comments:{"userId":req.body.userId,"comment":req.body.comments}}})
//                 res.status(200).json("comment added");
//             }
//             if(like_status){
//                 await currentFeed.updateOne({$push: {likes:req.body.userId}});
//                 // {$push:{feedStats:getStat(req.body.feedStats)}}
//                 res.status(200).json("like added");
//             }
//             if(feedStatus){
//                 let new_stat = currentFeed.feedStats[req.body.feedSelection] + 1;
//                 const index = req.body.feedSelection;
//                 let updateQuery = {};
//                 updateQuery[`feedStats.${index}`] = new_stat;
//                 await currentFeed.updateOne({$inc:updateQuery});
//                 // {$push:{feedStats:getStat(req.body.feedStats)}}
//                 res.status(200).json("Feed Stat Updated");
//             }
//             // feedinter = await feedInteractionModel.find({feedId:req.body.feedId});
            
//         }
//         // Condition for when the feed doesn't exist
//         else{
//             // const comment_status = req.body.commentStatus;
//             // const like_status = req.body.likeStatus;
//             const newFeedInteraction = new feedInteractionModel({
//                 feedId:req.body.feedId,
//                 userId:req.body.userId,
//                 comments:[{"userId":req.body.userId,"comment":req.body.comments}],
//                 likes:[req.body.userId],
//                 feedStats:req.body.feedStats
//             });
//             const user = await newFeedInteraction.save();
//             res.status(200).json("Feed interaction created");
//         }
//         res.status(500).json("some error occured");
//     }catch(err){
//         console.log(err);
//     }
// });

module.exports = router;

