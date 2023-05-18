const mongoose = require("mongoose");

const quizModel = new mongoose.Schema({
   quizId:{
    type:String, 
    require:true,
    unique:true,
   },
   quizText:{
    type:Array,
    default:[],
   },
   quizAnswerKey:{
    type:Array,
    default:[],
   }
},
    { timestamps:true}
);

module.exports = mongoose.model("quizModel",quizModel);