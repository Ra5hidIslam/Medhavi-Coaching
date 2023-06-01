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
    default:[],
   },
   questionAnswer:{
    type:Number,
   },
   userId:{
    type:String,
    require:true
   }
},
    { timestamps:true}
);

module.exports = mongoose.model("feedModel",feedSchema);