const router = require("express").Router();
const userModel = require("../models/user/userModel");
const bcrypt = require("bcrypt");

// Add user
router.post("/register", async (req,res)=>{
    try{
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        // creating new user
        const newUser = new userModel({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });

        // save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        console.log(err);
    }
});

// Login

router.post("/login",async (req,res)=>{
    try{
        const user =  await userModel.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).json("wrong password")
        
        // if(user == null){
        //     res.status(404).json("user not found");
        // }
        // else{
        //     res.status(200).send("user found");
        // }
        // if(validPassword == null){
        //     res.status(404).json("Wrong Password");
        // }
        // else{
        //     res.status(200).send("Loggedin");
        // }
        res.status(200).json(user)
    }catch(err){
        console.log(err);
        // res.send("Not working");
    }

    

})


module.exports = router;

