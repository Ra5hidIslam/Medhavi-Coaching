const router = require("express").Router();
const userModel = require("../models/user/userModel");
// const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// require('dotenv').config();


// Assign new access token after checking the refresh token

const handleLogout =  async (req,res)=>{
    // on client side, delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no Content
    const refreshToken = cookies.jwt;
    // check if the refresh token in DB
    const foundUser = await userModel.findOne({refreshToken:refreshToken});
    if(!foundUser){
        res.clearCookie('jwt',{ httpOnly: true});
        return res.sendStatus(403);//forbiddens
    }
    // As the user with the refresh Token has been found now we will delete the refresh token
    foundUser.updateOne({$set:{refreshToken:''}});
    res.clearCookie('jwt',{ httpOnly:true}); // secure: true - only serves on https
    res.sendStatus(204);
}


module.exports = { handleLogout };

