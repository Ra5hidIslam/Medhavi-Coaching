const mongoose = require("mongoose");

const postCommentsInteractionModel = new mongoose.Schema({
   commentId:{
    type:String, 
    require:true,
    unique:true,
   },
   likes:{
    type:Array,
    default:[],
   },
   savedBy:{
    type:Array,
    default:[],
   }
},
    { timestamps:true}
);

module.exports = mongoose.model("postCommentsInteractionModel",postCommentsInteractionModel);