const mongoose = require("mongoose");

const blogSchma = mongoose.Schema({
    username:String,
    userId:String,
    title:String,
    date:String,
    content:String,
    category:String,
    likes:Number,
    comment:Array,
    
},{versionKey:false});

const BlogModal = mongoose.model("blog",blogSchma);

module.exports={BlogModal}