const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    },
    isPhoneVerified:{
        type:Boolean,
        default:false,
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    dob:{
        type:Date,
        require: true
    },
    otp:{
        type:String,
    },
    otpExpirey:{
        type:Date
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare( enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User