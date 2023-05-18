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
   questionStats:{
    type:Array,
    default:[],
   },
   upvotes:{
    type:Array,
    default:[],
   },
   starMarkedByUsers:{
    type:Array,
    default:[],
   }
},
    { timestamps:true}
);

module.exports = mongoose.model("feedModel",feedSchema);