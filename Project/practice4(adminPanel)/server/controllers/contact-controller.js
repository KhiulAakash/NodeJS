const Contact=require('../models/contact-model');

const contactForm=async(req,resp)=>{
try {
    const {username,email,message}=req.body;
    await Contact.create({username,email,message});
    return resp.status(200).json({message:'Message send successfully'});
} catch (error) {
    console.log(error)
    return resp.status(500).json({message:'Message not delivered'});
}
}

module.exports=contactForm