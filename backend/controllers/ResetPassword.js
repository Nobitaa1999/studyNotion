const User=require('../models/User')
const {mailSender}=require('../utils/mailSender')
const bcrypt=require("bcrypt")
const crypto=require("crypto")

exports.resetPasswordToken=async(req,res)=>{
    try {
         const email=req.body.email;
         const user=await User.findOne({email:email})
         if(!user){
            return res.status(400).json({
                success:false,
                message:"Your email is not register with us"
            })
         }

         const token =crypto.randomUUID();
         const updateDetail=await User.findOneAndUpdate({email:email},{
            token:token,resetPasswordExpire:15*60*1000
         },{new:true})

        const url=`http://localhost:3000/update-password/${token}`;
        await mailSender(email,"Password reset link",`Link :${url}`)
        res.status(200).json({
            success:true,
            message:"reset link send to mail",
            updateDetail,url
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"somthing went wrong while link sending",
            error:error.message
        })
    }
}  

exports.resetPassword=async(req,res)=>{
    try {
        const{password,conformPassword,token}=req.body;
        if(password!==conformPassword){
            return res.status(400).json({
                success:false,
                message:"password is not matched"
            })
        }
        const userDetail=await User.findOne({token:token});
        if(!userDetail){
            return res.status(400).json({
                success:false,
                message:"invalid token"
            })
        }
        if(userDetail.resetPasswordExpire>Date.now()){
            return res.status(400).json({
                success:false,
                message:"token time expire regenrate new token"
            })
        }

        const hassPassword=await bcrypt.hash(password,10);
        const updatePasswordDetail= await User.findOneAndUpdate({token:token},{password:hassPassword},{new:true});
        res.status(200).json({
            success:true,
            message:"password reset"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            messsage:"somthing went wrong while password is being reset",
            error:error.message
        })
    }
}