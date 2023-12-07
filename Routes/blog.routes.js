const express = require("express");
const { BlogModal } = require("../Modal/blog.modal");
const { auth } = require("../Middleware/auth.middleware");

const blogRouter = express.Router();

blogRouter.use(auth);

blogRouter.get("/", async(req,res)=>{
    const {q,sort,category,order}= req.query;
    try{
        let searchObj={};
        if(category)
        {
            searchObj.category= category
        }
        const blogs = await BlogModal.find(category).sort({[sort]:order==="asc"? 1:-1});
        res.status(200).json(blogs)
    }catch(err){
        res.status(500).send({"msg":err})
    }
})

blogRouter.post("/", async(req,res)=>{
    try{
        const newPost = new BlogModal(req.body);
        await newPost.save();
        res.status(200).json({"msg":"New Blog Added","New Post":req.body})
        
    }catch(err){
        res.status(500).send({"msg":err})
    }
})

blogRouter.patch("/:id", async(req,res)=>{
    const {id}= req.params
    try{
        const blog = await BlogModal.findOne({_id:id});
        if(req.body.userId ==blog.userId)
        {
            await BlogModal.findByIdAndUpdate({_id:id},req.body)
            res.status(200).json({"msg":`This ${id} blog has been updated`,"updated blog":req.body})
        }else{
            res.status(200).json({"msg":"You Do not have Authority to update this Blog"})
        }
        
    }catch(err){
        res.status(500).send({"msg":err})
    }
})


blogRouter.delete("/:id", async(req,res)=>{
    const {id}= req.params
    try{
        const blog = await BlogModal.findOne({_id:id});
        if(req.body.userId ==blog.userId)
        {
            await BlogModal.findByIdAndDelete({_id:id})
            res.status(200).json({"msg":`This ${id} blog has been Deleted uccessfully`})
        }else{
            res.status(200).json({"msg":"You Do not have Authority to update this Blog"})
        }
        
    }catch(err){
        res.status(500).send({"msg":err})
    }
})

module.exports={blogRouter}