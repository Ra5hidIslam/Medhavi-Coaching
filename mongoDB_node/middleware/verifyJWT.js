const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = async (req,res,next)=>{
    try{
        const authHeader = req.headers['authorization'];
        if(!authHeader) return res.status(401).json("token not found");
        console.log(authHeader); // Bearer token
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err,decoded)=>{
                if(err) return res.status(403).json("invalid token");// invalid token status:forbidden
                req.user = decoded.username;
                // check if the user exits or not before letting the user get in
                next();
            }
        );
    }catch(err){
        console.log(err.message);
    }
    
}

module.exports = verifyJWT;