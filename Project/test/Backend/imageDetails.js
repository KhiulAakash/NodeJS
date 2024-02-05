const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema({
    image: String
});

module.exports=mongoose.model('imagesDetails',ImageDetailsSchema)