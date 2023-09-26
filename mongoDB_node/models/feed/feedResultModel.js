const mongoose = require("mongoose");

const feedResult = new mongoose.Schema({
   feedId:{
    type:String, 
    require:true,
    unique:true,
   },
   userId:{
    type:Array,
    require:true,
    unique:true,
   },
   userSelection:{
    // if 4 options with two answers = [0,0,1,1]
    // if 4 options with 1 answer = [0,0,0,1]
    type:Array,
   },
   userAnswer:{
    type:String,
   }
},
    { timestamps:true}
);

module.exports = mongoose.model("feedResult",feedResult);