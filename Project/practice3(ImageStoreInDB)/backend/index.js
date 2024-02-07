require('./db')
const Image=require('./imageSchema')
const express=require('express')
const multer=require('multer')
const cors=require('cors')

const app=express();
app.use(cors())
// Serve static files from the 'images' directory
app.use('/images', express.static('images'));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({storage}).single('avatar')

app.post('/upload',upload,async(req,resp)=>{
    const imageName=req.file.filename
    const { name, info } = req.body; 
    try {
        await Image.create({image:imageName,name:name, info:info})
        resp.status(200).send({status:"Image Uploaded successfully"})
    } catch (error) {
        resp.status(400).send({status:error})
    }
})

app.get('/getImage',async(req,resp)=>{
    try {
        const data=await Image.find({})
        resp.send({image:data})
    } catch (error) {
        
    }
})

app.listen(5000,()=>{
    console.log("Server is running at http://localhost:5000");
})   