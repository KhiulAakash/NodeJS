const mongoose=require('mongoose')
const dbURL='mongodb://localhost:27017/imageDB'
mongoose.connect(dbURL)
module.exports=mongoose.connection