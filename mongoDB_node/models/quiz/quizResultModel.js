const mongoose = require("mongoose");

const quizResult = new mongoose.Schema({
   quizId:{
    type:String, 
    require:true,
    unique:true,
   },
   userId:{
    type:String,
    require:true,
    unique:true,
   },
   quizScore:{
    type:Array,
    default:[],
   },
   quizResponse:{
    type:Array,
    default:[],
   }
},
    { timestamps:true}
);

module.exports = mongoose.model("quizResult",quizResult);