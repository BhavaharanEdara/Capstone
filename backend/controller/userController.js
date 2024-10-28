const User = require('../models/userModel');
const { generateRefreshToken } = require('../config/refreshToken');
const { generateToken } = require('../config/jwtToken');
const sendEmail = require('./emailController');
const { sendVerificationCode } = require('./mobileVerificationController');

const genrateOtp = ()=>{
    return  Math.floor(100000 + Math.random() * 900000).toString();
}
const createUser = async(req,res)=>{
    try{
        const findUserEmail = await User.findOne({email:req.body.email});        
        const findUserPhone = await User.findOne({phone:req.body.phone});
        if(findUserEmail){
            return res.status(409).json({message:'User with email is already exists'});
        }
        if(findUserPhone){
            return res.status(409).json({message:'User with phone is already exists'});
        }
        const user = new User(req.body);
        await user.save();
        const { password, ...payload } = user.toObject();
        const refreshToken = generateRefreshToken(payload);
        const jwt = generateToken(payload);
        res.cookie('refreshToken',refreshToken,{httpOnly:true, maxAge: 30*24*60*60*1000});
        res.json({user:payload, token:jwt});    

    }
    catch(error){
        res.status(400).json({message:"Failed to create User", error:error});
    }
}

const sendOtpMail = async(req,res)=>{
    try{
        const user = req.user
        const otp = genrateOtp();
        user.otp = otp;
        user.otpExpirey = Date.now() + 15*60*1000;
        await user.save();
        const otpCode = `<p>Your OTP is: <strong>${otp}</strong>. It is valid for 15 minutes.</p>`
        const mailData = {
            to:req.user.email,
            subject:"Email Verification",
            text:"Hi,",
            html:otpCode,
        }
        sendEmail(mailData);
        res.json({message:"Otp sent to mail"})
    }
    catch(error){
        res.status(400).json({message:"Failed to send OTP"})
    }
}

const verifyUser = async (req,res)=>{
    try{
        const {otp} = req.body
        if (!otp) {
            return res.status(400).json({ message: 'OTP has not been sent or has been expired.' });
        }    
        const user = req.user;
        if(otp===user.otp && user.otpExpirey>Date.now()){
            user.isEmailVerified = true;
            await user.save()
            const { password, ...payload } = user.toObject();
            const jwt = generateToken(payload);    
            return res.status(200).json({ user:user,message: 'OTP verified successfully!' , token:jwt});
        } else {
            return res.status(400).json({ message: 'Invalid OTP or Expired. Please try again.' });    
        }
    }
    catch(error){
        res.status(400).send("Failed to verify OTP");
    }
}

const sendMobileOtp = async(req,res)=>{
    try{
        const otp = genrateOtp();
        const user = req.user;
        user.otp = otp;
        user.otpExpirey = Date.now() + 15*60*1000;
        await user.save();
        await sendVerificationCode(user.phone, otp);
        res.status(200).json({message:"Otp sent"})
    }
    catch(error){
        res.status(400).json({message: "Failed to send mobile otp"})
    }
}
const verifyPhone = async(req,res)=>{
    try{
        const {otp} = req.body
        if (!otp) {
            return res.status(400).json({ message: 'OTP has not been sent or has expired.' });
        }    
        const user = req.user;
        if(otp===user.otp && user.otpExpirey>Date.now()){
            user.isPhoneVerified = true;
            await user.save()
            const { password, ...payload } = user.toObject();
            const jwt = generateToken(payload);    
            return res.status(200).json({ user:user,message: 'OTP verified successfully!', token:jwt });
        } else {
            return res.status(400).json({ message: 'Invalid OTP or Expired. Please try again.' });    
        }
    }
    catch(error){
        res.status(400).send("Failed to verify OTP");
    }
}
const login = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const findUser = await User.findOne({email:email});
        if(findUser && await findUser.isPasswordMatched(password)){
            const { password, ...userWithoutPassword } = findUser.toObject();
            const payload = userWithoutPassword;
            const refreshToken = generateRefreshToken(payload);
            const jwt = generateToken(payload);
            res.cookie('refreshToken',refreshToken,{httpOnly:true, maxAge: 30*24*60*60*1000});
            res.json({user:payload, token:jwt});    
        }
        else{
            if(!findUser){
                return res.status(404).send({message:"User not Found"});    
            }
            res.status(500).send({message:"Invalid Credentials"});    
        }
    }catch(error){
        res.status(400).json({message:"Failed to login"})
    }
}


const updateUser = async(req,res)=>{
    try{
        const user = req.user;
        const updateUser =await User.findByIdAndUpdate({_id:user._id}, req.body, {new:true});
        const { password, ...payload } = user.toObject();
        const jwt = generateToken(payload);
        res.status(200).json({user:updateUser, token:jwt});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"Failed to Update user"})
    }
}

const logout = async(req,res)=>{
    try{
        res.cookie('refreshToken',"",{httpOnly:true,maxAge:0,secure: true,});
        res.send({message: "Sucess full"});
    }
    catch(error){
        res.status(400).json({message:"Failed to logout"});
    }
}

const deleteUser = async(req,res)=>{
    try{
        const user = findByIdAndDelete(req.use._id);
        res.cookie('refreshToken',"",{httpOnly:true,maxAge:0,secure: true,});
        res.send({message:"User deleted sucessfully"})
    }
    catch(error){
        res.status(400).json({message:"Failed to logout"});
    }
}
module.exports = {createUser, login, verifyUser, updateUser, sendOtpMail, sendMobileOtp, verifyPhone, logout, deleteUser};