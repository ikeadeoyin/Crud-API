const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    deadline:{
        type: Date,
        required:true,
        default:Date.now()
    }
})

module.exports = mongoose.model("todo", todoSchema);