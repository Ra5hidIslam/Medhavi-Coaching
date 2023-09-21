const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
   questionTitle:{
    type:String, 
    require:true,

    min:5,
    max:300,
    unique:true,
   },
   questionOptions:{
    type:Array,
   },
   questionAnswer:{
    type:String,
    require:true,
   },
   examType:{
    type:String,
    require:true
   },
   subType:{
    type:String,
    require:true,
   },
   userId:{
    type:String,
    require:true
   },
   userName:{
    type:String,
    require:true
   }
},
    { timestamps:true}
);

module.exports = mongoose.model("feedModel",feedSchema);