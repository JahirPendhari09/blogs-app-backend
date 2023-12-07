const mongoose = require("mongoose");

const userSchma = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    avatar:String
},{versionKey:false});

const UserModal = mongoose.model("user",userSchma);

module.exports={UserModal}