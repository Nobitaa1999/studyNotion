const express=require("express");
const router=express.Router();

const{capturePayment,verifyPayment,sendPaymentSuccess}=require('../controllers/Payment')
const {auth,isAdmin,isInstructor,isStudent}=require('../middleware/auth')

router.post("/capturePayment",auth,isStudent,capturePayment)
router.post("/verifyPayment",auth,isStudent,verifyPayment)
router.post("/sendPaymentSuccess",auth,isStudent,sendPaymentSuccess)

module.exports=router;  