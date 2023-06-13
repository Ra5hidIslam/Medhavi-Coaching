const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    userId:{
        type:String,
        require:true,
        min:3,
        max:30,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    subscirption:{
        type:String,
    },
    followers:{
        type:Array,
        default:[], 
    },
    following:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    starMarkedQuestion:{
        type:Array,
        default:[],
    },
    correctQuestions:{
        type:Array,
        default:[],
    },
    wrongQuestions:{
        type:Array,
        default:[],
    },
    refreshToken:{
        type:String,
    },
    timeline:{
        type:Array,
        default:[],
    }
},
    { timestamps:true}
);

module.exports = mongoose.model("userModel",UserSchema);