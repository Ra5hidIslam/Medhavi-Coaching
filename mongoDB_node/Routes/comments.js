const router = require("express").Router();
const express = require("express");
const postModel = require('../models/post/postModel');
const postInteractionModel = require("../models/post/postInteractionModel");
const verifyJWT = require('../middleware/verifyJWT');
const userModel = require("../models/user/userModel")
const path = require('path');
const multer = require('multer');
const fs = require('fs'); // module to delete files in server.
const postCommentsModel = require("../models/postComments/postCommentsModel");
const postCommentsInteractionModel = require("../models/postComments/postCommentsInteractionModel");


// const userModel = require('../models/user/userModel');


router.use(express.static(__dirname+"./files/"));
const storage = multer.diskStorage({
    // cb = call back function
    // in the cb funciton, the first variable is the error which we don't care so we put null and the second variable is the action(depends of destination or filename)
    destination:(req,file,cb)=>{
        cb(null,'./files/commentPhotos/')
    },
    // create a filename format so each file is different
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});


// HELPER FUNCTIONS

// // helper function to get the feed from timeline of follower
// const  getPostFromUsers = async(timeline)=>{
//     // run a for loop to get the feed and them sort them in chronological order
//     const post = [];
//     try{
//         for(let i = 0; i<timeline.length; i++){
//             const foundPost = await postModel.findOne({_id:timeline[i]['postId']});
//             post.push(foundPost);
//         }
//     }catch(err){
//         return err.message;
//     }
//     return post;
// }


// async function getSelfPostsFromUsers(ID){
//     let post = [];
//     try{
//         post = await postModel.find({userId:ID});
//         return post;
//     }catch(err){
//         return err.message
//     }
// }

// async function postSelector(feedCount){
//     // get the feed and sort them by time(latest first).
//     const allPosts = postModel.find().sort({createdAt:-1});
//     // console.log("allfeeds",allFeeds);
//     return allPosts;
// }


// // Add comment
// requires comment,userId,userName,postId
router.post("/create",verifyJWT, upload.single('postImage'),async (req,res)=>{
    try{
        // creating new feed 
        // const commentImageUploaded = req.body.commentImage ? req.file.filename:
        let newComment;
        if(req.body.commentImage){
            newComment = new postCommentsModel({
            commentTitle:req.body.comment,
            userId:req.body.userId,
            userName:req.body.userName,
            commentImage:req.file.filename
            });
        }else
        {
            newComment = new postCommentsModel({
            commentTitle:req.body.comment,
            userId:req.body.userId,
            userName:req.body.userName
            });
        }
        
        // save feed and respond
        const comment = await newComment.save();
        // add the comment in the post interactions model for the post of the followers
        const foundPostInteraction = await postInteractionModel.findOne({"postId":req.body.postId});
        if(!foundPostInteraction) return res.status(403).json("post interaction not found");
        await foundPostInteraction.updateOne({$push: {comments:comment}});
        res.status(200).json(post);
    } catch(err){
        res.status(401).json(err.message);
    }
});

// Update Feed
router.put("/updateComment/:commentId",verifyJWT,upload.single('postImage'), async (req,res)=>{
    // check if comment exist using comment id
    // console.log(req.body.postTitle);
    const commentId = req.params.commentId;
    if(!commentId) return res.status(403).json("comment id not received");
    const foundComment = await commentModel.findOne({_id:commentId});
    if(!foundComment) return res.status(403).json("comment not found");
    // if the element to be updated is image then delete the older image and add the new image.
    if(req.file){
        // delete the older file.
        if(foundComment.filename){
            const filePath = './files/commentPhotos/' + foundPost.postImage;    
            fs.unlink(filePath,(err)=>{
                if(err){
                    console.log(err)
                    return
                }
                console.log("File deleted Successfully");
            })
        }
        
    }
    console.log(req.body.postTitle);
    await foundPost.updateOne({$set:req.body});
    res.status(200).json("post Updated");

    
    
});

// // delete comment
router.put("/deleteComment/:commentId",verifyJWT, async (req,res)=>{
    // check if comment exist using comment id
    const commentId = req.params.commentId;
    if(!commentId) return res.status(403).json("comment id not received");
    const foundcomment = await commentModel.findOne({_id:commentId});
    if(!foundcomment) return res.status(403).json("comment not found");
    // delete the comment from the postInteraction model too of the post
    const foundInteraction = await postInteractionModel.findOne({_id:foundInteraction.userId});
    if(!foundInteraction) return res.status(403).json("error in getting post interaction");
    try{
        foundInteraction.updateOne({},
            {$pull:{comments:{commentId:commentId}}},
            {multi:true});
        // console.log("comment deleted successfully");

    }catch(err){
        return res.status(403).json(err.message)
    }
    // Finally Delete the feed
    await foundpost.deleteOne({$set:req.body});
    res.status(200).json("post Deleted");
    
});

// // get a particular feed
// router.get("/getOnePost/:postId",verifyJWT, async (req,res)=>{
//     // check if post exist using post id
//     const postId = req.params.postId;
//     if(!postId) return res.status(403).json("post id not received");
//     // find the post based on the post id
//     const foundPost = await postModel.findOne({_id:postId});
//     if(!foundPost) return res.status(403).json("post not found");
//     // return the feed
//     res.status(200).json(foundPost);
    
// });

// // // Get post feed 
// // //  two ways to get the homefeed(algo for now), if the user is following others then show them first then fill the box with other posts

// router.get("/getPostFeed/:userId",verifyJWT, async (req,res)=>{
//     // check if feed exist using feed id
//     if(req.params.userId === "undefined" || req.params.userId === null) return res.sendStatus(403);
//     const userId = req.params.userId;
//     if(!userId) return res.status(403).json("user id not received");
//     // find the user and the following list
//     const foundUser = await userModel.findOne({_id:userId});
//     if(!foundUser) return res.status(403).json("user not found");
//     // get the timeline object from the user
//     const timeline = foundUser.timeline;
//     console.log("Length of timeline",Object.keys(timeline).length);
//     if(timeline == undefined){
//         console.log("RUnning option1");
//         // get feed from feed lists by sorting on timeline
//         const feeds = await postSelector(10);
//         res.status(200).json(feeds);    
//     }
//     else if(Object.keys(timeline).length <10){
//         console.log("RUnning option2");
//         // get feed from feed lists by sorting on timeline
//         const timelinePosts = await getPostFromUsers(timeline);
//         const selectedPosts = await postSelector(10 - timeline.length);
//         res.status(200).json(timelinePosts.concat(selectedPosts));
//         // append the two lists and return.
//     }
//     else{
//         // get the feed from the timeline
//         console.log("RUnning option3");
//         const post = await getPostFromUsers(timeline);
//         console.log("First promise");
//         res.status(200).json(feed);    
//     }
//     //     // get the feed from the timeline
//     // const feed = await getFeedFromUsers(timeline);
//     // console.log("First promise");
//     // res.status(200).json(feed);    
    
    
// });


// // //get userfeed
// // router.get("/getUserFeed/:userId",async (req,res)=>{
// //     // check if feed exist using feed id
// //     if(req.params.userId === "undefined" || req.params.userId === null) return res.sendStatus(403);
// //     const userId = req.params.userId;
// //     if(!userId) return res.status(403).json("user id not received");
// //     // find the user and the following list
// //     const feed = await getSelfFeedsFromUsers(userId);
// //     res.status(200).json(feed);
    
// // });



// // Add feedResult
// // router.post("/feedresult/:id",verifyJWT,async (req,res)=>{
// //     // check is the user and feed exist first
// //     try{
// //         if((await userModel.findById(req.body.userId)) && (await feedModel.findById(req.body.feedId))){
// //             const newFeedResult = new feedResultModel({
// //                 feedId:req.params.id,
// //                 userId:req.body.userId,
// //                 userSelection:req.body.userSelection,
// //             });
// //             // save user and respond
// //             const user = await newFeedResult.save();
// //             res.status(200).json(user);
// //         }
// //         else{
// //             res.status(500).json("User or feed not found")
// //             // create the object

// //         }
// //     }catch(err){
// //         console.log(err);
// //     }
// // });

// const createNewComment = async(userID,comment,userName)=>{
//     // userid  = userid of the commenter
//     // comment = comment object of postComment model
//     // const comment = postCommentsModel.findOne({'userId':userID});
//     // if(!comment){
        
//     // }
//     // else{
//     //     await comment.updateOne({"$push":{comments:newComment}});
//     // }
//     try{
//         const newComment = new postCommentsModel({
//             commentTitle:comment,
//             userId:userID,
//             userName:userName
//         });
//         const newCommentCreated = newComment.save();
//         return newCommentCreated._id;

//     }
//     catch(err){
//         console.log(err.message);
//         return 
//     } 
    
// } 



// Add feedInteraction
// When someone comments or likes or saves the post
// requires
// userID
// comment
// username

router.put("/commentInteraction",verifyJWT, async (req,res)=>{
    try{
        // check if the post interaction table for the post is already there
        // interfile = await postInteractionModel.findOne({"feedId":req.body.feedId});
        // res.status(500).json(interfile);
        const currentInteraction = await postCommentsInteractionModel.findOne({"commentId":req.body.commentId});
        if(currentInteraction){
            // if(req.body.){
            //     // create a comment and then add that to the list of comments in the postInteraction Object.
            //     const newComment = await createNewComment(req.body.userId,req.body.comment,req.body.userName);
            //     if(newComment){
            //         await currentInteraction.updateOne({"$push":{comments:newComment}});
            //         res.status(200).json("comment added");
            //     }
            //     else{
            //         res.status(401).json("Server Error");
            //     }
                
            // }
            if(req.body.like){
                await currentInteraction.updateOne({$push: {likes:req.body.commentId}});
                // {$push:{feedStats:getStat(req.body.feedStats)}}
                res.status(200).json("like added");
            }
            if(req.body.save){
                await currentInteraction.updateOne({$push: {savedBy:req.body.commentId}});
                // {$push:{feedStats:getStat(req.body.feedStats)}}
                res.status(200).json("savedBy added");
            }
            // if(feedStatus){
            //     let new_stat = currentFeed.feedStats[req.body.feedSelection] + 1;
            //     const index = req.body.feedSelection;
            //     let updateQuery = {};
            //     updateQuery[`feedStats.${index}`] = new_stat;
            //     await currentFeed.updateOne({$inc:updateQuery});
            //     // {$push:{feedStats:getStat(req.body.feedStats)}}
            //     res.status(200).json("Feed Stat Updated");
            // }
            // feedinter = await feedInteractionModel.find({feedId:req.body.feedId});
            
        }
        // Condition for when the feed doesn't exist
        else{
            // const comment_status = req.body.commentStatus;
            // const like_status = req.body.likeStatus;

            // const newComment = req.body.comment ? await createNewComment(req.body.userId,req.body.comment,req.body.userName): '';
            const likeStatus = req.body.like ? req.body.commentId: '';
            const savedStatus = req.body.save ? req.body.commentId:''; 
            const newCommentInteraction = new postCommentsInteractionModel({
                commentId:req.body.commentId,
                // userId:req.body.userId,
                // comments:[newComment],
                likes:[likeStatus],
                savedBy:[savedStatus],
                // feedStats:req.body.feedStats
            });
            const user = await newFeedInteraction.save();
            res.status(200).json("comment interaction created");
        }
        res.status(500).json("some error occured");
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

