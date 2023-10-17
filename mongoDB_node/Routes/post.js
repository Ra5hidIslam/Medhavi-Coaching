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


// const userModel = require('../models/user/userModel');


router.use(express.static(__dirname+"./files/"));


const storage = multer.diskStorage({
    // cb = call back function
    // in the cb funciton, the first variable is the error which we don't care so we put null and the second variable is the action(depends of destination or filename)
    destination:(req,file,cb)=>{
        cb(null,'./files/postPhotos/')
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
const  getPostFromUsers = async(timeline)=>{
    // run a for loop to get the feed and them sort them in chronological order
    const post = [];
    try{
        for(let i = 0; i<timeline.length; i++){
            const foundPost = await postModel.findOne({_id:timeline[i]['postId']});
            post.push(foundPost);
        }
    }catch(err){
        return err.message;
    }
    return post;
}


async function getSelfPostsFromUsers(ID){
    let post = [];
    try{
        post = await postModel.find({userId:ID});
        return post;
    }catch(err){
        return err.message
    }
    
    
}

async function getSavedPostsFromUsers(ID){
    let post = [];
    try{
        const user = await userModel.findById(ID);
        for(let i = 0;i<user.savedPosts.length;i++){
            const tempPost = await postModel.findById(user.savedPosts[i]);
            post.push(tempPost);
        }
        // post = await postModel.find({userId:ID});
        return post;
    }catch(err){
        return err.message
    }
    
    
}

async function postSelector(feedCount){
    // get the feed and sort them by time(latest first).
    const allPosts = postModel.find().sort({createdAt:-1});
    // console.log("allfeeds",allFeeds);
    return allPosts;
}


// Add post
router.post("/create",verifyJWT, upload.single('postImage'),async (req,res)=>{
    try{
        // creating new feed 
        const postImageUploaded = req.body.postImage ? req.file.filename: null;
        const newPost = new postModel({
            postTitle:req.body.postTitle,
            postContent:req.body.postContent,
            userId:req.body.userId,
            userName:req.body.userName,
            postImage:postImageUploaded
        });
        // save feed and respond
        const post = await newPost.save();
        // add the feed in the timelines of the followers
        const foundUser = await userModel.findOne({_id:req.body.userId});
        if(!foundUser) return res.status(403).json("user not found");
        const followers = foundUser.followers;
        for(let i = 0;i<followers.length;i++){
            // update all the user's timeline object
            // get the user
            const currentUser = await userModel.findOne({_id:followers[i]});
            await currentUser.updateOne({$push:{timeline:{postId:post._id,
                                                          userId:req.body.userId
                                                        }
                                                }
                                        });
        }
        res.status(200).json(post);
    } catch(err){
        res.status(401).json(err.message);
    }
});

// Update Feed
router.put("/updatePost/:postId",verifyJWT,upload.single('postImage'), async (req,res)=>{
    // check if feed exist using feed id
    console.log(req.body.postTitle);
    const postId = req.params.postId;
    if(!postId) return res.status(403).json("post id not received");
    const foundPost = await postModel.findOne({_id:postId});
    if(!foundPost) return res.status(403).json("post not found");
    // if the element to be updated is image then delete the older image and add the new image.
    if(req.file && foundPost.postImage){

        // delete the older file.
        const filePath = './files/postPhotos/' + foundPost.postImage;
        console.log(filePath);
        fs.unlink(filePath,(err)=>{
            if(err){
                console.log(err);
                return
            }
            console.log("File deleted Successfully");
        })
    }
    console.log(req.body.postTitle);
    try{
        if(req.file){
            await foundPost.updateOne({$set:{"postImage":req.file.filename}});  
        }
        await foundPost.updateOne({$set:req.body});
        res.status(200).json("post Updated");
    }catch(err){
        res.status(403).json(err.message);
    }
    

    
    
});

// delete post
router.put("/deletePost/:postId",verifyJWT, async (req,res)=>{
    // check if feed exist using feed id
    const postId = req.params.postId;
    if(!postId) return res.status(403).json("post id not received");
    const foundpost = await postModel.findOne({_id:postId});
    if(!foundpost) return res.status(403).json("feed not found");
    // delete the post from the timeline too of ther followers
    const foundUser = await userModel.findOne({_id:foundpost.userId});
    if(!foundUser) return res.status(403).json("id not received in post");
    try{
        const followers = foundUser.followers;
        for(let i = 0;i<followers.length;i++){
            let currentUser = await userModel.findOne({_id:followers[i]});
            currentUser.updateOne({},
                {$pull:{timeline:{postId:req.params.postId}}},
                {multi:true})
        }
    }catch(err){
        return res.status(403).json(err.message)
    }
    // delete the file
    if(foundpost.postImage){
        const filePath = './files/postPhotos/' + foundPost.postImage;    
        fs.unlink(filePath,(err)=>{
            if(err){
                console.log(err)
                return
            }
            console.log("File deleted Successfully");
        })
    }
    // Finally Delete the feed
    await foundpost.deleteOne({$set:req.body});
    res.status(200).json("post Deleted");
    
});

// get a particular feed
router.get("/getOnePost/:postId",verifyJWT, async (req,res)=>{
    // check if post exist using post id
    const postId = req.params.postId;
    if(!postId) return res.status(403).json("post id not received");
    // find the post based on the post id
    const foundPost = await postModel.findOne({_id:postId});
    if(!foundPost) return res.status(403).json("post not found");
    // return the feed
    res.status(200).json(foundPost);
    
});

// // Get post feed 
// //  two ways to get the homefeed(algo for now), if the user is following others then show them first then fill the box with other posts

router.get("/getPostFeed/:userId",verifyJWT, async (req,res)=>{
    // check if feed exist using feed id
    if(req.params.userId === "undefined" || req.params.userId === null) return res.sendStatus(403);
    const userId = req.params.userId;
    if(!userId) return res.status(403).json("user id not received");
    // find the user and the following list
    const foundUser = await userModel.findOne({_id:userId});
    if(!foundUser) return res.status(403).json("user not found");
    // get the timeline object from the user
    const timeline = foundUser.timeline;
    console.log("Length of timeline",Object.keys(timeline).length);
    if(timeline == undefined){
        console.log("RUnning option1");
        // get feed from feed lists by sorting on timeline
        const feeds = await postSelector(10);
        res.status(200).json(feeds);    
    }
    else if(Object.keys(timeline).length <10){
        console.log("RUnning option2");
        // get feed from feed lists by sorting on timeline
        const timelinePosts = await getPostFromUsers(timeline);
        const selectedPosts = await postSelector(10 - timeline.length);
        res.status(200).json(timelinePosts.concat(selectedPosts));
        // append the two lists and return.
    }
    else{
        // get the feed from the timeline
        console.log("RUnning option3");
        const post = await getPostFromUsers(timeline);
        console.log("First promise");
        res.status(200).json(feed);    
    }
    //     // get the feed from the timeline
    // const feed = await getFeedFromUsers(timeline);
    // console.log("First promise");
    // res.status(200).json(feed);    
    
    
});


// //get userfeed
router.get("/getUserPost/:userId",async (req,res)=>{
    // check if feed exist using feed id
    if(req.params.userId === "undefined" || req.params.userId === null) return res.sendStatus(403);
    const userId = req.params.userId;
    if(!userId) return res.status(403).json("user id not received");
    // find the user and the following list
    const post = await getSelfPostsFromUsers(userId);
    res.status(200).json(post);
    
});

router.get("/getSavedPost/:userId",async (req,res)=>{
    // check if feed exist using feed id
    if(req.params.userId === "undefined" || req.params.userId === null) return res.sendStatus(403);
    const userId = req.params.userId;
    if(!userId) return res.status(403).json("user id not received");
    // find the user and the following list
    const post = await getSavedPostsFromUsers(userId);
    res.status(200).json(post);
    
});



// Add feedResult
// router.post("/feedresult/:id",verifyJWT,async (req,res)=>{
//     // check is the user and feed exist first
//     try{
//         if((await userModel.findById(req.body.userId)) && (await feedModel.findById(req.body.feedId))){
//             const newFeedResult = new feedResultModel({
//                 feedId:req.params.id,
//                 userId:req.body.userId,
//                 userSelection:req.body.userSelection,
//             });
//             // save user and respond
//             const user = await newFeedResult.save();
//             res.status(200).json(user);
//         }
//         else{
//             res.status(500).json("User or feed not found")
//             // create the object

//         }
//     }catch(err){
//         console.log(err);
//     }
// });

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

// //get userfeed
router.get("/getUserPost/:userId",async (req,res)=>{
    // check if feed exist using feed id
    if(req.params.userId === "undefined" || req.params.userId === null) return res.sendStatus(403);
    const userId = req.params.userId;
    if(!userId) return res.status(403).json("user id not received");
    // find the user and the following list
    const feed = await getSelfPostsFromUsers(userId);
    res.status(200).json(feed);
});



// Add postInteraction
// When someone comments or likes or saves the post
// requires
// userID
// comment

router.put("/postInteraction/:postId",verifyJWT, async (req,res)=>{
    try{
        // check if the post interaction table for the post is already there
        // interfile = await postInteractionModel.findOne({"feedId":req.body.feedId});
        // res.status(500).json(interfile);
        console.log("postId == ",req.params.postId);
        const currentInteraction = await postInteractionModel.findOne({"postId":req.params.postId});
        if(currentInteraction){
            // const comment_status = req.body.commentStatus;
            // const like_status = req.body.likeStatus;
            // const feedStatus = req.body.feedStatStatus;
            // res.status(500).json("feed found");
            // if(req.body.comment){
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
            if(req.body.button == "like"){
                const user = await userModel.findById(req.body.userId);
                if(!(user.likedPosts.includes(req.params.postId))){
                    await user.updateOne({$push:{likedPosts:req.params.postId}});   
                }
                if(currentInteraction.likes.includes(req.body.userId)){
                    res.status(200).json(currentInteraction);
                }
                else{
                    await currentInteraction.updateOne({$push: {likes:req.body.userId}});
                    res.status(200).json(currentInteraction);
                }
                
                // {$push:{feedStats:getStat(req.body.feedStats)}}
                
            }
            if(req.body.button == "save"){
                // find the user
                const user = await userModel.findById(req.body.userId);
                if(!(user.savedPosts.includes(req.params.postId))){
                    await user.updateOne({$push:{savedPosts:req.params.postId}});    
                }
                if(currentInteraction.savedBy.includes(req.body.userId)){
                    
                    res.status(200).json(currentInteraction);
                }
                else{
                    await currentInteraction.updateOne({$push: {savedBy:req.body.userId}});
                    // newInter.save();
                    res.status(200).json(currentInteraction);
                }
                
                // {$push:{feedStats:getStat(req.body.feedStats)}}
                
            }
            if(req.body.button == "unlike"){
                const user = await userModel.findById(req.body.userId);
                if((user.likedPosts.includes(req.params.postId))){
                    await user.updateOne({$pull:{likedPosts:req.params.postId}});    
                }
                if(currentInteraction.likes.includes(req.body.userId)){
                    await currentInteraction.updateOne({$pull: {likes:req.body.userId}});
                    res.status(200).json(currentInteraction);
                }
                // res.status(200).json(currentInteraction);
                // {$push:{feedStats:getStat(req.body.feedStats)}}
                
            }
            if(req.body.button == "unsave"){
                // find the user
                const user = await userModel.findById(req.body.userId);
                if((user.savedPosts.includes(req.params.postId))){
                    await user.updateOne({$pull:{savedPosts:req.params.postId}});    
                }
                if(currentInteraction.savedBy.includes(req.body.userId)){
                    await currentInteraction.updateOne({$pull: {savedBy:req.body.userId}});
                    res.status(200).json(currentInteraction);
                }    
                // res.status(200).json(currentInteraction);
                
                
                // {$push:{feedStats:getStat(req.body.feedStats)}}
                
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
            const likeStatus = req.body.button == "like" ? [req.body.userId]: undefined;
            const saveStatus = req.body.button == "save" ? [req.body.userId]: undefined;
            if(req.body.save == "true"){
                const user = await userModel.findById(req.body.userId);
                await user.updateOne({$push:{savedPosts:req.params.postId}});
            }
            const newFeedInteraction = new postInteractionModel({
                postId:req.params.postId,
                likes:likeStatus,
                savedBy:saveStatus
            });
            const feedInter = await newFeedInteraction.save();
            res.status(200).json(feedInter);
        }
        // res.status(500).json("some error occured");
    }catch(err){
        console.log(err);
    }
});

// Get post interaction
router.get("/getPostInteraction/:postId",verifyJWT,async (req,res)=>{
    // check if feed exist using feed id
    if(req.params.postId === "undefined" || req.params.postId === null) return res.sendStatus(403);
    const postId = req.params.postId;
    if(!postId) return res.status(403).json("user id not received");
    // find the user and the following list
    const postInteration = await postInteractionModel.findOne({'postId':postId});
    res.status(200).json(postInteration);
});



module.exports = router;

