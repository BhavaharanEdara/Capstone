const mongoose = require('mongoose')

const kycSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    validId:{
        type:Object,
        require:true,
    },
    addressProof:{
        type:Object,
        require:true
    },
    status:{
        type:String,
        enum:["Pending", "Processing","Approved", "Rejected"],
        default:"Pending"
    }
})

const Kyc = mongoose.model('Kyc', kycSchema)
module.exports = Kyc