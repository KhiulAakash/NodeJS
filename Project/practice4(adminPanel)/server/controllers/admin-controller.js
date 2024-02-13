const Contact = require('../models/contact-model');
const  User=require('../models/user-model');

const getAllUsers=async(req,resp)=>{
    try {
        const users=await User.find({},{password:0});
        console.log(users)
        if(!users || users.length===0){
            return  resp.status(404).json({message:"No Users Found"})
        }
        return resp.status(200).json(users)
    } catch (error) {
        next(error) 
    }
}

const getAllContacts=async(req,resp)=>{
    try {
        const contacts=await Contact.find();
        if(!contacts || contacts.length===0){
            return resp.status(404).json({message:'No Users Found'})
        }
        return resp.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
}

const deleteUserById=async(req,resp)=>{
    try {
        const id=req.params.id
        await User.deleteOne({_id:id})
        return resp.status(200).json({message:'User deleted successfully'})
    } catch (error) {
        new(error)
    }
}

const getUserById=async(req,resp)=>{
    try {
        const id=req.params.id
        const data=await User.findOne({_id:id},{password:0})
        return resp.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

const updateUserById=async(req,resp)=>{
    try {
        const id=req.params.id;
        const updatedUserdata=req.body;
        const updatedData=await User.updateOne({_id:id},{$set:updatedUserdata})
        return resp.status(200).json(updatedData)
    } catch (error) {
        next(error)
    }
}

module.exports={getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById};