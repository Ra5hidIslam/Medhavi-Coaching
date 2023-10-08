const mongoose = require("mongoose");

const postInteractionModel = new mongoose.Schema({
   postId:{
    type:String, 
    require:true,
    unique:true,
   },
   comments:{
    type:Array,
    default:[],
   },
   likes:{
    type:Array,
    default:[],
   },
   savedBy:{
    type:Array,
    default:[],
   }
//    feedStats:{
//     type:Array,
//     default:[],
//    }
},
    { timestamps:true}
);

module.exports = mongoose.model("postInteractionModel",postInteractionModel);