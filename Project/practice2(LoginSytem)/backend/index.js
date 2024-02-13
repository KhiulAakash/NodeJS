const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer=require('multer')

const JWT_SECRET = "ksjdnlfkjsndlfkjnsfhfg87r5274350y347345cn^%$&^%";

// database connection
require("./db");
const app = express();

// collection schema
const User = require("./userSchema");
const Product=require("./productSchema")

// parse req data
app.use(express.json());
app.use(cors());
app.use('/images', express.static('images'));

// register router
app.post("/register", async (req, resp) => {
  const { name, email, password ,confirmPassword} = req.body;
  if(password!==confirmPassword) return resp.status(409).send({status:'Confirm password is not matched'})
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser)
      return resp
        .status(409)
        .send({ status: "Already registered with the same email" });
    const newUser = new User({ name, email, password: encryptedPassword });
    await newUser.save();
    resp.status(201).send({ status: "Registration successful" });
  } catch (error) {
    resp.status(400).send({ status: error });
  }
});

// login router
app.post("/login", async (req, resp) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return resp
        .status(409)
        .send({ status: "User doesn't exist with the provided email" });
    if (await bcrypt.compare(password, checkUser.password)) {
      const token = jwt.sign({ user: checkUser }, JWT_SECRET);
      resp
        .status(201)
        .send({
          status: "Login successful",
          user: { name: checkUser.name, email: checkUser.email,userId:checkUser._id},
          token: token,
        });
    } else {
      resp.status(401).send({ status: "Invalid Password" });
    }
  } catch (error) {
    if (error.message) {
      resp.status(400).send({ status: error });
    } else {
      resp.status(500).send({ status: "Internal Server Error" });
    }
  }
});

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'images/')
  },
  filename:(req,file,cb)=>{
      cb(null,file.originalname)
  }
})

const upload=multer({storage}).single('avatar')

app.post("/add-product",upload,async (req, resp) => {
  const imageName=req.file.filename
  const{productName,price,userId}=req.body
  try {
    await Product.create({userId:userId,name:productName,price:price,image:imageName})
    resp.status(200).send({status:"Image Uploaded successfully"})
  } catch (error) {
    resp.status(400).send({status:error})
  }
});

app.get('/get-images',async(req,resp)=>{
  try {
    const { userId } = req.query; 
    const data = await Product.find({ userId: userId });
      resp.send({image:data})
  } catch (error) {
      resp.send(error)
  }
})


app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
