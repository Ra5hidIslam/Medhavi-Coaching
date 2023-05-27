const router = require("express").Router();
const userModel = require("../models/user/userModel");
// const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// require('dotenv').config();


// Assign new access token after checking the refresh token

const handleRefreshToken =  async (req,res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); //unauthorized
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = await userModel.findOne({refreshToken:refreshToken});
    if(!foundUser) return res.sendStatus(403);//forbiddens
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username":decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn:'15m'}
            );
            res.status(200).json({ accessToken });
        }
    );
}


module.exports = { handleRefreshToken };

