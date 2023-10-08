const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
   postTitle:{
    type:String, 
    require:true,

    min:5,
    max:300,
    unique:true,
   },
   postContent:{
    type:String,
    max:1000,
   },
   userId:{
    type:String,
    require:true
   },
   userName:{
    type:String,
    require:true
   },
   postImage:{
    type:String,
}
},
    { timestamps:true}
);

module.exports = mongoose.model("postModel",postSchema);