const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
});

module.exports = mongoose.model("imagesDetails", ImageDetailsSchema);
