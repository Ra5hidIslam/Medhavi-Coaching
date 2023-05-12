const userModel = require('../models/userModel');
const router = require("express").Router();
const bcrypt = require("bcrypt");

// update user
router.delete("/:id", async(req,res)=>{
    if(req.body.userId == req.params.id || req.user.isAdmin){
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
    }else{
        return res.status(403).json("You can only delete your own account")
        // status code 403: forbidden
    }

})
// delete a user
router.put("/:id", async(req,res)=>{
    if(req.body.userId == req.params.id || req.user.isAdmin){
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
//follow a user
// unfollow a user

// router.get("/",(req,res)=>{
//     res.send("hey its user route");
// })


module.exports = router;

