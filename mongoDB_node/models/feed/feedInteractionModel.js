const mongoose = require("mongoose");

const feedInteractionModel = new mongoose.Schema({
   feedId:{
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
   }
},
    { timestamps:true}
);

module.exports = mongoose.model("feedInteractionModel",feedInteractionModel);