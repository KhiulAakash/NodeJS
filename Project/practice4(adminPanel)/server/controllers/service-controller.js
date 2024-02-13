const Service=require('../models/service-model')

const services=async(req,resp)=>{
    try {
        const response=await Service.find();
        if(!response){
            resp.status(404).json({msg:'No service found'});
            return;
        }
        resp.status(200).json({response})
    } catch (error) {
        console.log('Error in service controller',error)
    }
}

module.exports=services;