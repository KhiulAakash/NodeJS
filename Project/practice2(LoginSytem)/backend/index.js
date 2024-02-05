const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ksjdnlfkjsndlfkjnsfhfg87r5274350y347345cn^%$&^%";

// database connection
require("./db");
const app = express();

// collection schema
const User = require("./userSchema");

// parse req data
app.use(express.json());
app.use(cors());

// register router
app.post("/register", async (req, resp) => {
  const { name, email, password } = req.body;
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
          user: { name: checkUser.name, email: checkUser.email },
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

//profile router

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
