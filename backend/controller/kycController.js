const kyc = require("../models/kycModel");
const { cloudinaryDeleteImg } = require("../utils/cloudinary");

const createKYC = async(req,res)=>{
    try{
        const application = new kyc({userId:req.user._id, validId:req.files[0], addressProof:req.files[1]});
        await application.save()
        res.send({application: application})
    }
    catch(error){
        res.staus(400).send({message:"Failed to create application"});
    }
}

const getKyc = async(req,res)=>{
    try{
        const application =await kyc.findOne({userId: req.user._id});
        res.status(200).json({application: application})
    }
    catch(error){
        res.status(400).send({message:"Failed to fetch application"});
    }
}

const updateKYC = async(req,res)=>{
    try{
        const application = await kyc.findOne({userId:req.user._id});
        cloudinaryDeleteImg(application.validId.public_id);
        cloudinaryDeleteImg(application.addressProof.public_id);
        application.validId = req.files[0];
        application.addressProof = req.files[1];
        application.status = "Pending"
        await application.save();
        res.status(200).json({updatedApplication: application, message:"Updated application"});
    }
    catch(error){
        console.log(error);
        res.status(400).send({message:"Failed to update application"})
    }
}

const deleteKyc = async(req,res)=>{
    try{
        const application = kyc.findOne({userId:req.user._id});
        if(!application){
            return res.send({message:"No kyc"});
        }
        cloudinaryDeleteImg(application.validId.public_id);
        cloudinaryDeleteImg(application.addressProof.public_id);
        application.validId = req.files[0];
        application.addressProof = req.files[1];
        await findByIdAndDelete(application._id);
        res.send(200).json({deletedApplication:application, message:"Deleted sucessfully"});
    }
    catch(error){
        res.staus(400).send({message:"Failed to delete application"})
    }
}
module.exports = {createKYC, getKyc, updateKYC, deleteKyc}