const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
   questionTitle:{
    type:String, 
    require:true,

    min:5,
    max:300,
    unique:true,
   },
   questionType:{
    // exp: MCQ,MSQ,NUM
    type:String,
   },
   questionOptions:{
    type:Array,
   },
   questionAnswer:{
    type:Array,
   },
   qustionAnswerNum:{
    type:String,
   },
   examType:{
    // Exp Physics
    type:String,
    require:true,
   },
   subType:{
    // Physics-Thermodynamics
    type:String,
    require:true,
   },
    topicType:{
    type:String,
   }
//    ,
//    userId:{
//     type:String,
//     require:true,
//    },
//    userName:{
//     type:String,
//     require:true
//    }
},
    { timestamps:true}
);

module.exports = mongoose.model("feedModel",feedSchema);