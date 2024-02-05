const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: String,
  email:{type:String,unique:true},
  imageName:String
});

const Collection = mongoose.model('user', collectionSchema);

module.exports = Collection;
