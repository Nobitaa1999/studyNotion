const User=require('../models/User');
const OTP=require('../models/Otp');
const otpGenerator=require('otp-generator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const mailSender=require('../utils/mailSender')
const Profile=require("../models/Profile")
require("dotenv").config();

exports.sendOtp=async(req,res)=>{
    try {
        const {email}=req.body;
        const isEmailExist=await User.findOne({email});
        if(isEmailExist){
            return res.status(401).json({
                success:false,
                message:"User already register"
            })
        }

        let otp=otpGenerator.generate(6, { 
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false 
        });
        let result=await OTP.findOne({otp:otp});
        while(result){
             otp=otpGenerator.generate(6, { 
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false 
            });
             result=await OTP.findOne({otp:otp});
        }
     
        const otpbody=await OTP.create({email,otp});


        res.status(200).json({
            success:true,
            message:"otp successfully sent",
            data:otpbody
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error occured during otp sent",
            error:error.message
        })
    }
}

// sign up
 
exports.signUp=async(req,res)=>{
    try {
        const {firstName,lastName,email,password,conformPassword,accountType,contactNumber,otp}=req.body;
        if(!firstName || !lastName || !email|| !password|| !conformPassword ||  !otp){
            return res.status(500).json({
                success:false,
                message:"fill all details",
            })
        }
        
        if(password!=conformPassword){
            return res.status(400).json({
                success:false,
                message:"conform password dosn't match"
            })
        }

        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                success:false,
                message:"User is already present"
            })
        }

        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"otp not found"
            })
        }
        else if(otp!= recentOtp[0].otp){ //check
            return res.status(400).json({
                success:false,
                message:"otp invalid"
            })
        }

        const hassPassword= await bcrypt.hash(password,10);

        let approved="";
        approved==="Instructor"?(approved=false):(approved=true);

        const profileDetail=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
        const user=await User.create({
            firstName,lastName,email,contactNumber,accountType,
            password:hassPassword,
            approved:approved,
            additionalDetail:profileDetail._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        res.status(200).json({
            success:true,
            message:"user is successfully resgister",
            data:user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"user is not register please try agian",
            error:error.message
        })
    }

}

// login

exports.login=async(req,res)=>{
    try {
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"fill all credantials"
            })
        }
        const user =await User.findOne({email:email}).populate("additionalDetail");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            console.log("check",password);
           const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"24h"
           })
           user.token=token;
           user.password=undefined;

           const option={
            expires:new Date(Date.now()+24*60*60*1000),
            httpOnly:true
           }
           res.cookie("token",token,option).status(200).json({
            success:true,
            data:user,
            token:token,
            message:"logged in"
           })
        }else{
            res.status(401).json({
                success:false,
                message:"Incorrect password"
            })
        }
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"login failed",
            error:error.message
        })
    }
}

// change password

exports.changePassword=async(req,res)=>{ 
    try {
        const {email,password,newPassword,conformNewPassword}=req.body;
        if(!password || !newPassword||!conformNewPassword){
            return res.status(400).json({
                success:false,
                message:"all feilds are neccesary"
            })
        }
        if(newPassword!=conformNewPassword){
            return res.status(400).json({
                success:false,
                message:"conform password not matched"
            })
        }
        
        let user=await User.findOne({email});
        if(bcrypt.compare(password, user.password)){
            const changePassword=await bcrypt.hash(newPassword,10);
            await User.findByIdAndUpdate(user._id,{password:changePassword},{new:true});

        }else{
            return res.status(400).json({
                success:false,
                message:"old password incorrect"
            })
        }
        
        res.status(200).json({
            success:true,
            message:"password change successfully"
        })
    } catch (error) {
        console.log("error occuring while changing password : ",error);
        console.log("error message : ",error.message);
        res.status(500).json({
            success:false,
            message:"password not changed",
            error:error.message
        })
    }
}
