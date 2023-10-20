const express = require("express");
const router = require("express").Router();
const userModel = require("../models/user/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs'); // module to delete files in server.
const multer = require('multer');
require('dotenv').config();

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



// Create user
router.post("/register",upload.single('image'), async (req,res)=>{
    // checking if the body contains the user
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if(!name || !email || !password) return res.status(400).json("name, email and password required");
    // check for dupicate user
    const duplicate = await userModel.findOne({email:email});
    if(duplicate != null) return res.status(409).json(duplicate); //conflict
    const fileName = req.file ? req.file.filename : undefined
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new userModel({
            name:req.body.name,
            email:req.body.email,
            userId:req.body.userId,
            password:hashedPassword,
            image:fileName,
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
    try{
        if(req.body.email == "" || req.body.password == "") return res.status(400).json("Username and password required for login");
        const email = req.body.email;
        const password = req.body.password; 
        const foundUser = await userModel.findOne({email:email});
        if(!foundUser) return res.sendStatus(401);//unauthorized
        // evaluate password
        const match = await bcrypt.compare(password,foundUser.password);
        if(match){
            // create jwt
            const accessToken = jwt.sign(
                {"username":foundUser.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'2min'}
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
            console.log("User found");
        }else{
            console.log("error in loggin in from server");
            res.sendStatus(401);
    
        }
    }
    catch(err){
        console.log(err.message);
    }
   
    

})


module.exports = router;

