const express = require('express')
const router = express.Router()

const {auth,isInstructor}=require("../middleware/auth")
const {createdProfile,updateProfile,deleteAccount,getAllUserDetails,updateProfilePicture,getEnrolledCourse,instructorDashboard}=require("../controllers/Profile")

router.delete('/delete-profile',auth,deleteAccount)
router.put('/update-profile-details',auth,updateProfile)
router.get('/getUserDetail',auth,getAllUserDetails)

router.get('/get-enrolled-course',auth,getEnrolledCourse)
router.put('/update-profile-picture',auth,updateProfilePicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports=router; 