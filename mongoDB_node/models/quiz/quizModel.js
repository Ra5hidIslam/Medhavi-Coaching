const mongoose = require("mongoose");

const quizModel = new mongoose.Schema({
   quizId:{
    type:String, 
    require:true,
    unique:true,
   },
   quizQuestions:{
    type:Array,
    default:[],
   },
   quizAnswerKey:{
    type:Array,
    default:[],
   },
   quizTime:{
    type:Number,
   },
   quizTopic:{
    type:String,
    min:2,
    max:50,
   }

},
    { timestamps:true}
);

module.exports = mongoose.model("quizModel",quizModel);