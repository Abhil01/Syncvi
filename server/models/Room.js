const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomID:{
        type:String,
        minLength:1,
        maxLength:10,
        required:true,
        unique:true,
    },
    createdBy:{
        type:String,
        minLength:1,
        maxLength:50,
        required:true,
    },
    

},{timestamps:true});

const Room = mongoose.model("Room",RoomSchema);
module.exports ={Room};