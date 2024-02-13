const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    userId:String,
    name:String,
    price:Number,
    image:String,
})
module.exports=mongoose.model('products',productSchema)