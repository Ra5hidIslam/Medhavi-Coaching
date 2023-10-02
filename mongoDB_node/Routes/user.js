const verifyJWT = require('../middleware/verifyJWT');
const userModel = require('../models/user/userModel');
const feedModel = require('../models/feed/feedModel');
const router = require("express").Router();
const express = require('express');
const bcrypt = require("bcrypt");
const { verify } = require('jsonwebtoken');
const path = require('path');

const multer = require('multer');
// const userModel = require('../models/user/userModel');


router.use(express.static(__dirname+"./files/"));
const storage = multer.diskStorage({
    // cb = call back function
    // in the cb funciton, the first variable is the error which we don't care so we put null and the second variable is the action(depends of destination or filename)
    destination:(req,file,cb)=>{
        cb(null,'./files/profilePhotos/')
    },
    // create a filename format so each file is different
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});


// upload user image
router.post("/uploadPI/:id",verifyJWT,upload.single('image'),async(req,res)=>{
    try{
        let tempUser = await userModel.findById(req.params.id);
        await tempUser.updateOne({$set:{"image":req.file.filename}});
        res.status(200).json("Account has been updated");
    }catch(err){
        return res.status(500).json(err);
    }

    // res.json("file uploaded");
    }
    

)


// delete user
router.delete("/:id",verifyJWT, async(req,res)=>{
    // return res.status(200).json("success");
    if(req.body.userId != req.params.id && !req.body.isAdmin) return res.status(403).json("You can only delete your own account")
    // first delete the user from the following and followers list of other users and then delete the user.
    const foundUser = await userModel.findById(req.params.id);
    if(!foundUser) return res.status(403).json("User not found");
    // remove from followers list of following 
    // let tempArr = 0;
    try{
        
        for(let i = 0;i<foundUser.following.length;i++){
            let tempUser = await userModel.findById(foundUser.following[i]);
            // tempArr =  tempArr +i;
            // await tempUser.followingfindByIdAndDelete(tempUser)
            // simply splicing the array won't work in mongo db, we need to update the object
            let followersList = tempUser.followers;
            let indexOfUser = followersList.indexOf(req.params.id);
            if(indexOfUser>-1){
                followersList.splice(indexOfUser,1);
            }
            // update the original object
            await tempUser.updateOne({$set:{followers:followersList}});
        }    
        // return res.status(401).json(tempArr);
    }
    catch(err){
        return res.status(403).json("error in erasing following list");
    }
    try{
         // remove from following list of followers
         for(let i = 0;i<foundUser.followers.length;i++){
            let tempUser = await userModel.findById(foundUser.followers[i]);
            // await tempUser.followingfindByIdAndDelete(tempUser)
            let followingList = tempUser.following;
            let indexOfUser = followingList.indexOf(req.params.id);
            if(indexOfUser>-1){
                followingList.splice(indexOfUser,1);
            }
            await tempUser.updateOne({$set:{following:followingList}});
        }
    }
    catch(err){
        return res.status(403).json("error in clearing followers list")
    } 
    // remove the feeds created by the user in the feeds model
    try{
        await feedModel.deleteMany({userId:req.params.id});
    }catch(err){
        return res.status(403).json("not able to delete the feeds created by the user");
    }
    // remove the feeds from the timelines of the user
    try{
        const followers = foundUser.followers;
        for(let i = 0;i<followers.length;i++){
            let currentUser = await userModel.findOne({_id:followers[i]});
            currentUser.updateOne({},
                {$pull:{timeline:{userId:req.params.userId}}},
                {multi:true})
        }
    }catch(err){
        return res.status(403).json(err);
        // "not able to delete the timeline feeds"
    }

    // delete the file
    if(foundUser.image){
        const filePath = './files/profilePhotos/' + foundUser.image;    
        fs.unlink(filePath,(err)=>{
            if(err){
                console.log(err)
                return
            }
            console.log("File deleted Successfully");
        })
    }

    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted successfully");

})



// update a user
router.put("/:id",verifyJWT, async(req,res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){ 
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
           }
           catch(err){
                return res.status(500).json(err);
           }
        }
        try{
            const user = await userModel.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }
    }

})



// get a user
router.get("/:id", verifyJWT,async (req,res)=>{
    try{
        const user = await userModel.findById(req.params.id);
        const {password,updatedAt,refreshToken,...other} = user._doc;
        res.setHeader('Access-Control-Allow-Credentials',true);
        // res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});



//follow a user
router.put("/follow/:id",verifyJWT, async (req,res)=>{
    if(req.body.userId !== req.params.id){
        // need to update my following and follower list?
        // first find the two users
        try{
            const user = await userModel.findById(req.params.id);//person to follow
            const currentUser = await  userModel.findById(req.body.userId);//person following
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {following: req.params.id}});
                res.status(200).json("User has been followed");
            }else{
                res.status(403).json("User already follows the particular user");
            }

        }catch(err){
            res.status(500).json(err);
        }
        
    }else{
        req.status(403).json("You can't follow yourself!");
    }
})



// unfollow a user
router.put("/:id/unfollow",verifyJWT, async (req,res)=>{
    if(req.body.userId !== req.params.id){
        // need to update my following and follower list?
        // first find the two users
        try{
            const user = await userModel.findById(req.params.id);//person to follow
            const currentUser = await  userModel.findById(req.body.userId);//person following
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {following: req.params.id}});
                res.status(200).json("User has been unfollowed");
            }else{
                res.status(403).json("You already unfollow this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
       
    }else{
        req.status(403).json("You can't unfollow yourself!");
    }
})
// router.get("/",(req,res)=>{
//     res.send("hey its user route");
// })


module.exports = router;

