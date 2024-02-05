// app.js

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost/test");

// Create a Mongoose model for image details
const ImageDetails = mongoose.model("imageDetails", {
  filename: String,
  originalname: String,
  path: String,
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); // Set your desired destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Multer upload configuration
const upload = multer({ storage }).single("image");

// Express route to handle file upload
app.post("/upload",upload, async (req, res) => {
  try {
    const { filename, originalname, path } = req.file;

    // Save image details to MongoDB
    const imageDetails = new ImageDetails({
      filename,
      originalname,
      path,
    });

    await imageDetails.save();

    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/images", async (req, res) => {
  try {
    const imageDetails = await ImageDetails.find();
    res.status(200).json(imageDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
