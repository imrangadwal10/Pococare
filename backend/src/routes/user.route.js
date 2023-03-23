const {Router} =require("express");
const jwt=require("jsonwebtoken")
const {createUser,checkUser,refreshUserToken}=require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const userRouter=Router();

userRouter.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
     const {message,desc}= await createUser({name,email,password})  
      if(message!=="OK"){
          return res.status(400).send("user creation failed");
        }
        return res.status(201).send({desc,message});
    }catch(e){
     res.send(e.message)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
     const {message,desc,token,refreshToken}= await checkUser({email,password})  
     console.log(message)
      if(message==="FAILED"){
          return res.status(401).send({desc:"login failed"});
      }else if(message==="OK"){
          return res.status(200).send({desc,token,refreshToken});
      }
    }catch(e){
     res.send(e.message)
    }
})

userRouter.post("/refresh",async(req,res)=>{
    const refreshToken=req.headers.token;
   console.log(refreshToken)

    try{
        const {message,desc,newToken}= await refreshUserToken({refreshToken})  
        if(message!=="OK"){
            return res.status(400).send("Failed");
          }
          return res.status(200).send({desc,message,newToken});
    }catch(e){
        res.send(e.message)
    }
})

module.exports=userRouter;