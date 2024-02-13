const User = require("../models/user-model");
const bcrypt=require('bcryptjs')
const home = async (req, resp) => {
  try {
    resp.status(200).send("Welcome to Home page");
  } catch (error) {
    resp.status(500).send({ err: "Internal Server Error" });
  }
};

//Register router
const register = async (req, resp) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;

    //Check if registered email is already exist or not
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return resp.status(409).json({ message: "Email already exits" });
    }

    //store respective data to the respective collection
    const userCreated = await User.create({ username, email, phone, password });
    resp.status(201).json({
      msg: "Registration Successfull",
      token: await userCreated.generateToken(),
      userId:userCreated._id.toString()
    });
  } catch (error) {
    console.log(error)
    resp.status(500).json({ err: "Internal Server Error" });
  }
};

//Login router
const login=async(req,resp)=>{
  try {
    const{email,password}=req.body;
    const userExist=await User.findOne({email});
    if(!userExist){
      return resp.status(409).json({message:"Invalid Credentials"})
    }
    
    const user=await userExist.comparePassword(password)
    if(user){
      resp.status(200).json({
        msg: "Login Successfull",
        token: await userExist.generateToken(),
        userId:userExist._id.toString()
      });
    }else{
      resp.status(401).json({message:"Invalid email or password"});
    }
  } catch (error) {
    resp.status(500).json({ err: "Internal Server Error" });
    console.log(error)
  }
}

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register,login,user };
