const {Router} =require("express");
const authMiddleware = require("../middleware/authMiddleware");
const homeRouter=Router();


homeRouter.get("/",authMiddleware,async(req,res)=>{
     res.status(200).send("home page")
})

module.exports=homeRouter;