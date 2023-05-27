const router = require("express").Router();
const userModel = require("../models/user/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Add user
const addUser =  async (req,res)=>{
    // checking if the body contains the user
    const { username, email, pwd} = req.body;
    if(!username || !email || !pwd) return res.status(400).json("username, email and password required");
    // check for dupicate user
    const duplicate = userModel.findOne({email:email});
    if(duplicate) return res.sendStatus(409); //conflict
    try{
        const hashedPassword = await bcrypt.hash(pwd,10);
        const newUser = new userModel({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });
         // save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
    }
   
};

// Login

const loginUser = async (req,res)=>{
    const { usr, email, pwd} = req.body;
    if ((!usr && !email) || !pwd ) return res.status(400).json("Username and password required for login");
    const foundUser = userModel.findOne({email:email});
    if(!foundUser) return res.sendStatus(401);//unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd,foundUser.password);
    if(match){
        // create jwt
        const accessToken = jwt.sign(
            {"username":foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expire:'30s'}
        );
        const refreshToken = jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expire:'1d'}
        );
        // 1. Need to save the refresh token in the db
        // 2. Need to send the accessToken and the refresh token to the client 
        // set the refreshToken for the user in the db
        await foundUser.updateOne({$set:{refreshToken:refreshToken}});
        // send the refresh token in http Only cookies
        res.cookie('jwt',refreshToken,{ httpOnly:true, maxAge:90*24*60*60*100});
        // send the accessToken to the client which must be stored in the memory and not local storage
        res.status(200).json({accessToken:accessToken});


    }else{
        res.sendStatus(401);
    }
    

};


module.exports = {
    addUser,
    loginUser
}

