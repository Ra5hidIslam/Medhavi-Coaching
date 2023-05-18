const router = require("express").Router();
const feedModel = require("../models/feedModel");
const feedInteractionModel = require("../models/feed/feedInteractionModel");
const feedResultModel = require("../models/feed/feedResultModel");

// Add feed
router.post("/", async (req,res)=>{
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
    try{
        // creating new feed 
        const newFeedResult = new feedResultModel({
            feedId:req.body.feedId,
            userId:req.body.userId,
            userSelection:req.body.userSelection,
        });
        // save user and respond
        const user = await newFeedResult.save();
        res.status(200).json(user);
    } catch(err){
        console.log(err);
    }
});


// Add feedInteraction
router.post("/feedinteraction", async (req,res)=>{
    try{
        // creating new feed 
        const newFeedInteraction = new feedInteractionModel({
            feedId:req.body.feedId,
            comments:req.body.comments,
            likes:req.body.likes,
            feedStats:req.body.feedStats,
        });
        // save user and respond
        const user = await newFeedInteraction.save();
        res.status(200).json(user);
    } catch(err){
        console.log(err);
    }
});

module.exports = router;

