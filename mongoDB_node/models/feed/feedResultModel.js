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
    type:Array,
   }
},
    { timestamps:true}
);

module.exports = mongoose.model("feedResult",feedResult);