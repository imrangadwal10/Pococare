const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const REFRESHSECRET = process.env.JWT_REFRESH_SECRET;
const bcrypt=require("bcrypt");

const createUser = async ({ name, email, password }) => {
    
  const findEmail = await UserModel.findOne({email});
  if(findEmail){
  return {
      message: "OK",
      desc: "User already exists",
    };
  }else{
    const hashPassword = await bcrypt.hash(password,12)
  const user = new UserModel({ name, email, password:hashPassword });
  await user.save();
  return {
   message: "OK",
   desc: "User created successfully",
  };
  }
    
};

const checkUser = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    const hashpassword = await bcrypt.compare(password,user.password);
  if (user && hashpassword) {
    var token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      SECRET,
      { expiresIn: "7 days" }
    );
    var refreshToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      REFRESHSECRET,
      { expiresIn: "21 days" }
    );
    return {
      message: "OK",
      desc: "Logged inn successfully",
      token: token,
      refreshToken: refreshToken,
    };
  }else{
    return {
      message:"FAILED",
    }
  }
};

const refreshUserToken = async ({ refreshToken }) => {
 
  if (!refreshToken) {
    return res.status(401).send("unauthorized");
  }
  const verification = jwt.verify(refreshToken, REFRESHSECRET);
  if (verification){
    var newToken = jwt.sign(
      { id: verification.id, name: verification.name },
      SECRET,
      { expiresIn: "7 days" }
    );
  }
  return {
    message: "OK",
    desc: "Token generated successfully",
    newToken,
  };
};

module.exports = { createUser, checkUser, refreshUserToken };
