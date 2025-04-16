const mongoose=require("mongoose");
const {mailSender} = require("../utils/mailSender");
const {otpSendTemplate}=require("../utils/mailTemplates/otpsend")

const otpSchema= new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    otp:{
        type:Number,
        require:true
    },
    createAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})

async function sendVerificationCode(email,otp){
    try {
        const otpHtml = otpSendTemplate(otp);
        // const otpHtml = otp;

        const mailResponce=await mailSender(email,"OTP for varification from studyNotion",otpHtml);
        console.log("mail send successfully ",mailResponce);
    } catch (error) {
        console.log("error occured while sending otp to mail");
        throw error;
    }
}

otpSchema.pre('save',async function(next){
    
   try {
     sendVerificationCode(this.email,this.otp);
     
     next();
   } catch (error) {
    next(error);
   }
})

module.exports=mongoose.model("OTP",otpSchema);