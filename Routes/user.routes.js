const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModal } = require("../Modal/user.modal");

const userRouter = express.Router();

userRouter.post("/register", async(req,res)=>{
    const {email,password,username}= req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                res.status(200).send({"msg":err})
            }else{

                const newUser = new UserModal({
                    email,username,password:hash,
                    avatar:"https://cdn.vectorstock.com/i/1000x1000/08/56/user-profile-login-or-access-authentication-icon-vector-28920856.webp"
                })
                await newUser.save();
                res.status(200).send({"msg":"New User has been Added","New User":req.body})
            }
        });

    }catch(err){
        res.status(500).send({"msg":err})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user = await UserModal.findOne({email});
        if(user)
        {
            const token = jwt.sign({userId:user._id,username :user.username}, 'masai-mock6');
            bcrypt.compare(password,user.password, async(err, result)=> {
                if(result)
                {
                    res.status(200).send({"msg":"Login Successful","token":token,"user":user})
                }else{
                    res.status(400).send({"msg":" Wrong Password"})
                }
            });

        }else{
            res.status(400).send({"msg":"Email address is Wrong"})
        }

    }catch(err){
        res.status(500).send({"msg":err})
    }
})

module.exports={userRouter}