const router = require("express").Router();
const feedModel = require("../models/feed/feedModel");
const feedInteractionModel = require("../models/feed/feedInteractionModel");
const feedResultModel = require("../models/feed/feedResultModel");
const userModel = require("../models/user/userModel")


// HELPER FUNCTIONS

// helper function to get the feed from timeline of follower
const  getFeedFromUsers = async(timeline)=>{
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


// Add feed
router.post("/create", async (req,res)=>{
    try{
        // creating new feed 
        const newFeed = new feedModel({
            questionTitle:req.body.questionTitle,
            questionOptions:req.body.questionOptions,
            questionAnswer:req.body.questionAnswer,
            userId:req.body.userId,
            userName:req.body.userName,
        });
        // save feed and respond
        const feed = await newFeed.save();
        // add the feed in the timelines of the followers
        const foundUser = await userModel.findOne({_id:req.body.userId});
        if(!foundUser) return res.status(403).json("user not found");
        const followers = foundUser.followers;
        for(let i = 0;i<followers.length;i++){
            // update all the user's timeline object
            // get the user
            const currentUser = await userModel.findOne({_id:followers[i]});
            await currentUser.updateOne({$push:{timeline:{feedId:feed._id,
                                                          userId:req.body.userId
                                                        }
                                                }
                                        });
        }
        res.status(200).json(feed);
    } catch(err){
        console.log(err);
    }
});

// Update Feed
router.put("/updateFeed/:feedId", async (req,res)=>{
    // check if feed exist using feed id
    const feedId = req.params.feedId;
    if(!feedId) return res.status(403).json("feed id not received");
    const foundFeed = await feedModel.findOne({_id:feedId});
    if(!foundFeed) return res.status(403).json("feed not found");
    await foundFeed.updateOne({$set:req.body});
    res.status(200).json("Feed Updated");
    
});

// delete feed
router.put("/deleteFeed/:feedId", async (req,res)=>{
    // check if feed exist using feed id
    const feedId = req.params.feedId;
    if(!feedId) return res.status(403).json("feed id not received");
    const foundFeed = await feedModel.findOne({_id:feedId});
    if(!foundFeed) return res.status(403).json("feed not found");
    // delete the feed from the timeline too of ther followers
    const foundUser = await userModel.findOne({_id:foundFeed.userId});
    if(!foundUser) return res.status(403).json("id not received in feed");
    try{
        const followers = foundUser.followers;
        for(let i = 0;i<followers.length;i++){
            let currentUser = await userModel.findOne({_id:followers[i]});
            currentUser.updateOne({},
                {$pull:{timeline:{feedId:req.params.feedId}}},
                {multi:true})
        }
    }catch(err){
        return res.status(403).json(err.message)
    }
    // Finally Delete the feed
    await foundFeed.deleteOne({$set:req.body});
    res.status(200).json("Feed Deleted");
    
});

// get a particular feed
router.get("/getOneFeed/:feedId", async (req,res)=>{
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
router.get("/getHomeFeed/:userId", async (req,res)=>{
    // check if feed exist using feed id
    if(req.params.userId === "undefined" || req.params.userId === null) return res.sendStatus(403);
    const userId = req.params.userId;
    if(!userId) return res.status(403).json("user id not received");
    // find the user and the following list
    const foundUser = await userModel.findOne({_id:userId});
    if(!foundUser) return res.status(403).json("user not found");
    // get the timeline object from the user
    const timeline = foundUser.timeline;
    // get the feed from the timeline
    const feed = await getFeedFromUsers(timeline);
    console.log("First promise");
    res.status(200).json(feed);
    
});


//get userfeed
router.get("/getUserFeed/:userId", async (req,res)=>{
    // check if feed exist using feed id
    if(req.params.userId === "undefined" || req.params.userId === null) return res.sendStatus(403);
    const userId = req.params.userId;
    if(!userId) return res.status(403).json("user id not received");
    // find the user and the following list
    const feed = await getSelfFeedsFromUsers(userId);
    res.status(200).json(feed);
    
});



// Add feedResult
router.post("/feedresult/:id", async (req,res)=>{
    // check is the user and feed exist first
    try{
        if((await userModel.findById(req.body.userId)) && (await feedModel.findById(req.body.feedId))){
            const newFeedResult = new feedResultModel({
                feedId:req.params.id,
                userId:req.body.userId,
                userSelection:req.body.userSelection,
            });
            // save user and respond
            const user = await newFeedResult.save();
            res.status(200).json(user);
        }
        else{
            res.status(500).json("User or feed not found")
            // create the object

        }
    }catch(err){
        console.log(err);
    }
});



// Add feedInteraction
router.put("/feedinteraction", async (req,res)=>{
    try{
        // check if the feed interaction table for the feed is already there
        // interfile = await feedInteractionModel.findOne({"feedId":req.body.feedId});
        // res.status(500).json(interfile);
        const currentFeed = await feedInteractionModel.findOne({"feedId":req.body.feedId});
        if(currentFeed){
            const comment_status = req.body.commentStatus;
            const like_status = req.body.likeStatus;
            const feedStatus = req.body.feedStatStatus;
            // res.status(500).json("feed found");
            if(comment_status){
                await currentFeed.updateOne({"$push":{comments:{"userId":req.body.userId,"comment":req.body.comments}}})
                res.status(200).json("comment added");
            }
            if(like_status){
                await currentFeed.updateOne({$push: {likes:req.body.userId}});
                // {$push:{feedStats:getStat(req.body.feedStats)}}
                res.status(200).json("like added");
            }
            if(feedStatus){
                let new_stat = currentFeed.feedStats[req.body.feedSelection] + 1;
                const index = req.body.feedSelection;
                let updateQuery = {};
                updateQuery[`feedStats.${index}`] = new_stat;
                await currentFeed.updateOne({$inc:updateQuery});
                // {$push:{feedStats:getStat(req.body.feedStats)}}
                res.status(200).json("Feed Stat Updated");
            }
            // feedinter = await feedInteractionModel.find({feedId:req.body.feedId});
            
        }
        // Condition for when the feed doesn't exist
        else{
            // const comment_status = req.body.commentStatus;
            // const like_status = req.body.likeStatus;
            const newFeedInteraction = new feedInteractionModel({
                feedId:req.body.feedId,
                userId:req.body.userId,
                comments:[{"userId":req.body.userId,"comment":req.body.comments}],
                likes:[req.body.userId],
                feedStats:req.body.feedStats
            });
            const user = await newFeedInteraction.save();
            res.status(200).json("Feed interaction created");
        }
        res.status(500).json("some error occured");
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

