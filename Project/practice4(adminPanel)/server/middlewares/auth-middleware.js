const jwt = require("jsonwebtoken");
const User=require('../models/user-model')

const authMiddleware = async(req, resp, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return resp
      .status(401)
      .json({ message: "Unauthorized HTTP, token not provided" });
  }
  const jwtToken=token.replace('Bearer',"").trim();
console.log(jwtToken)
  try {
    const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY)
    console.log(isVerified)
    const userData=await User.findOne({email:isVerified.email}).select({password:0});
    req.token=token;  
    req.user=userData;
    req.userId=userData._id;
  } catch (error) {
    return resp.status(401).json({message:'Unauthorized. Invalid token.'})
  }
  next()
};
module.exports = authMiddleware;
