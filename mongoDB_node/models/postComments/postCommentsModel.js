const mongoose = require("mongoose");

const postCommentSchema = new mongoose.Schema({
   commentTitle:{
    type:String, 
    require:true,

    min:5,
    max:300
   },
   userId:{
    type:String,
    require:true
   },
   userName:{
    type:String,
    require:true
   },
   commentImage:{
    type:String,
   },
},
    { timestamps:true}
);

module.exports = mongoose.model("postCommentsModel",postCommentSchema);