const verifyJWT = require('../middleware/verifyJWT');
// const userModel = require('../models/user/userModel');
// const feedModel = require('../models/feed/feedModel');
const router = require("express").Router();
const express = require('express');
const notesModel = require('../models/notes/notes');
// const bcrypt = require("bcrypt");
// const { verify } = require('jsonwebtoken');s
const path = require('path');

const multer = require('multer');
// const userModel = require('../models/user/userModel');


router.use(express.static(__dirname+"./files/"));
const storage = multer.diskStorage({
    // cb = call back function
    // in the cb funciton, the first variable is the error which we don't care so we put null and the second variable is the action(depends of destination or filename)
    destination:(req,file,cb)=>{
        cb(null,'./files/notes/')
    },
    // create a filename format so each file is different
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});


// Add post
router.post("/create",verifyJWT, upload.single('file'),async (req,res)=>{
    try{
        // creating new note
        const pdfUploaded = req.body.pdf ? req.file.filename: null;
        const newNote = new notesModel({
            notesText:req.body.postTitle,
            file:pdfUploaded
        });
        // save note and respond
        const note = await newNote.save();
        res.status(200).json(note);
    } catch(err){
        res.status(401).json(err.message);
    }
});


// upload pdf 
router.post("/uploadPDF/:id",verifyJWT,upload.single('file'),async(req,res)=>{
    try{
        const note = await notesModel.findById(req.params.id);
        await note.updateOne({$set:{"file":req.file.filename}});
        res.status(200).json("PDF has been uploaded");
    }catch(err){
        return res.status(500).json(err);
    }
    // res.json("file uploaded");
    }
    

)



// delete note
router.delete("/:id",verifyJWT, async(req,res)=>{
    // return res.status(200).json("success");
    if(!req.body.isAdmin) return res.status(403).json("You can only delete your own account")
    // first delete the user from the following and followers list of other users and then delete the user.
    const foundNote = await notesModel.findById(req.params.id);
    if(!foundNote) return res.status(403).json("User not found");

    // delete the file
    if(foundNote.file){
        const filePath = './files/notes/' + foundNote.file;    
        fs.unlink(filePath,(err)=>{
            if(err){
                console.log(err)
                return
            }
            console.log("File deleted Successfully");
        })
    }

    await notesModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Note has been deleted successfully");

})



// // update a note
// router.put("/:id",verifyJWT, async(req,res)=>{
//     if(req.body.isAdmin){ 
//         try{

//             await notesModel.findByIdAndUpdate(req.params.id,{
//                 $set: req.body,
//             });
//             res.status(200).json("Note has been updated");
//         }catch(err){
//             return res.status(500).json(err);
//         }
//     }

// })



// get all notes
router.get("/allnotes", verifyJWT,async (req,res)=>{
    try{
        const notes = await userModel.find({});
        res.setHeader('Access-Control-Allow-Credentials',true);
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json(err);
    }
});






module.exports = router;

