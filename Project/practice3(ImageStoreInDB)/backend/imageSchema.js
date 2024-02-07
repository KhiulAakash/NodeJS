const mongoose=require('mongoose')
const imageSchema=new mongoose.Schema({
    image:String,
    name:String,
    info:String
})
module.exports=mongoose.model('imageDetails',imageSchema);