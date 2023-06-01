const verifyJWT = require('../middleware/verifyJWT');
const userModel = require('../models/user/userModel');
const router = require("express").Router();
const bcrypt = require("bcrypt");

// delete user
router.delete("/:id",verifyJWT, async(req,res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try{
            const user = await userModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted successfully");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only delete your own account")
        // status code 403: forbidden
    }

})
// update a user
router.put("/:id", async(req,res)=>{
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
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});

//follow a user
router.put("/follow/:id", async (req,res)=>{
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
router.put("/:id/unfollow", async (req,res)=>{
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

