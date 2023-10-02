const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
   notesText:{
    type:String, 
    require:true,

    min:5,
    max:300,
    unique:true,
   },
   file:{
    // filename if there is an accompanying pdf file.
    type:String,
   },
},
    { timestamps:true}
);

module.exports = mongoose.model("notesModel",noteSchema);