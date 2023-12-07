const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.routes");
const { blogRouter } = require("./Routes/blog.routes");
const app = express();
const cors = require('cors')

app.use(express.json());
 
app.use(cors())

app.use("/users",userRouter);
app.use("/blogs",blogRouter);

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("MongoDB Atlas Connected");
    }
    catch(err){
        console.log(err)
    }
})