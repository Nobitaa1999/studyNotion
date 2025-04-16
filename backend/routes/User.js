const express = require('express')
const router = express.Router()

const{signUp,login,sendOtp,changePassword}=require("../controllers/auth")
const {resetPasswordToken,resetPassword}=require("../controllers/ResetPassword")
const{auth}=require("../middleware/auth")

// *****************Authantication 
// for user login
router.post("/login",login);
// for user signup
router.post("/signup",signUp); 
// otp sent to user mail
router.post("/sendotp",sendOtp);
// changing password
router.post("/change-password",auth,changePassword)

// ******************reset password
// generating a reset password token 
router.post("/reset-password-token",resetPasswordToken)
// reset user password after token verified
router.post("/reset-password",resetPassword)

module.exports=router 