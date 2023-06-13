const router = require("express").Router();
const userModel = require("../models/user/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create user
router.post("/register", async (req,res)=>{
    // checking if the body contains the user
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if(!username || !email || !password) return res.status(400).json("username, email and password required");
    // check for dupicate user
    const duplicate = await userModel.findOne({email:email});
    if(duplicate !== null) return res.status(409).json(duplicate); //conflict
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new userModel({
            username:req.body.username,
            email:req.body.email,
            userId:req.body.userId,
            password:hashedPassword,
        });
         // save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
    }
   
});

// Login

router.post("/login",async (req,res)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password ) return res.status(400).json("Username and password required for login");
    const foundUser = await userModel.findOne({email:email});
    if(!foundUser) return res.sendStatus(401);//unauthorized
    // evaluate password
    const match = await bcrypt.compare(password,foundUser.password);
    if(match){
        // create jwt
        const accessToken = jwt.sign(
            {"username":foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        const refreshToken = jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        // 1. Need to save the refresh token in the db
        // 2. Need to send the accessToken and the refresh token to the client 
        // set the refreshToken for the user in the db
        await foundUser.updateOne({$set:{refreshToken:refreshToken}});
        // send the refresh token in http Only cookies
        res.cookie('jwt',refreshToken,{ httpOnly:true, maxAge:90*24*60*60*100});
        // send the accessToken to the client which must be stored in the memory and not local storage
        res.status(200).json({
            accessToken:accessToken,
            userId:foundUser._id,
        
        });
    }else{
        res.sendStatus(401);
    }
    

})


module.exports = router;

