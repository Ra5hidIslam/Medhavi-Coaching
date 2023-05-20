const router = require("express").Router();
const feedModel = require("../models/feed/feedModel");
const feedInteractionModel = require("../models/feed/feedInteractionModel");
const feedResultModel = require("../models/feed/feedResultModel");
const userModel = require("../models/user/userModel")

// Add feed
router.post("/create", async (req,res)=>{
    try{
        // creating new feed 
        const newFeed = new feedModel({
            questionTitle:req.body.questionTitle,
            questionOptions:req.body.questionOptions,
            questionAnswer:req.body.questionAnswer,
        });
        // save user and respond
        const user = await newFeed.save();
        res.status(200).json(user);
    } catch(err){
        console.log(err);
    }
});

// Add feedResult
router.post("/feedresult", async (req,res)=>{
    // check is the user and feed exist first
    try{
        if((await userModel.findById(req.body.userId)) && (await feedModel.findById(req.body.feedId))){
            const newFeedResult = new feedResultModel({
                feedId:req.body.feedId,
                userId:req.body.userId,
                userSelection:req.body.userSelection,
            });
            // save user and respond
            const user = await newFeedResult.save();
            res.status(200).json(user);
        }
        else{
            res.status(500).json("User or feed not found")
        }
    }catch(err){
        console.log(err);
    }
});

function getStat(stat){
    if(stat){
        var stat_array = new Array
    }
}

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

