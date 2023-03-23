require("dotenv").config();
const express=require("express");
const userRouter = require("./routes/user.route.js");
const cors = require("cors");
const app = express();
const connect = require("./connect/db");
const homeRouter = require("./routes/home.js");
const PORT = process.env.PORT;
app.use(cors())
app.use(express.json())

app.use("/user",userRouter)
app.use("/home",homeRouter)

app.get("/", (req, res) => {
    res.status(200).send("Api running successfully")
})

app.listen(PORT,async()=>{
    await connect( )
     console.log(`listening on port ${PORT}`)
});