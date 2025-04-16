const Profile=require('../models/Profile');
const User=require('../models/User')
const Course=require('../models/Course')
const CourseProgress=require('../models/CourseProgress')
const {imageUploadeCloudinary}=require('../utils/imageUploadToCloudinary')
const {convertSecondsToDuration}=require('../utils/secToDuration')

exports.createdProfile=async(req,res)=>{
    try {
        const {dateOfBirth="",about="",gender,contactNumber}=req.body;
        const id=req.user.id
        if(!gender || !contactNumber){
            return res.status(400).json({
                success:false,
                message:"All feild are require"
            })
        }
        const user=await User.findById(id);
        const profileId=user.additionalDetail;
        const profile=await Profile.findById(profileId);
        profile.dateOfBirth=dateOfBirth;
        profile.about=about;
        profile.gender=gender;
        profile.contactNumber=contactNumber;
        await profile.save();
        return res.status(200).json({
            success:true,
            message:"Profile detail successfully",
            profile
        })
    } catch (error) {
        console.log("error occure while creating profile");
        return res.status(500).json({
            success:false,
            message:"Unable to create profile try again"
        })        
    }
}


exports.deleteAccount=async (req,res)=>{
    try {
        const id=req.user.id;
        const user=await User.findById({_id:id});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        const profileId=user.additionalDetail;
        await Profile.findByIdAndDelete(profileId);
        for (const courseId of user.courses) {
            await Course.findByIdAndUpdate(
              courseId,
              { $pull: { studentsEnroled: id } },
              { new: true }
            )
          }    
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"user account deleted"
        })
        await CourseProgress.deleteMany({ userId: id })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"account not deleted"
        })
    }
}

exports.getAllUserDetails=async(req,res)=>{
    try {
        const id=req.user.id;
        console.log(id);
         const userDetail=await User.findById(id).populate("additionalDetail").exec();
         if(!userDetail){
            return res.status(400).json({
                success:false,
                message:"user not found",
               
            })
         }
         return res.status(200).json({
            success:true,
            message:"user data fetched successfully",
            userDetail
         })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user data denaied",
            error:error.message
        })
    }
}

exports.updateProfile=async(req,res)=>{
    try {
        const {dateOfBirth,about,gender,contactNumber}=req.body;
        const id=req.user.id
        const updatedUser=await User.findById(id);
        if(!updatedUser){
            return res.status(400).json({
                success:false,
                message:"user not present database"
            })
        }
        const profileId=updatedUser.additionalDetail;
        // const profileId=updatedUser.profile;
        const updatedUserProfile=await Profile.findByIdAndUpdate(profileId,
                                                                    {
                                                                        $set:{
                                                                            dateOfBirth,
                                                                            about,
                                                                            gender,
                                                                            contactNumber
                                                                        }
                                                                    },{new:true})
        if(!updatedUserProfile){
            return res.status(404).json({
                success:false,
                message:"profile not found",
               
            })       
        }
        
        return res.status(200).json({
            success:true,
            message:"profile detail updated",
            updatedUserProfile
        })                                                            
    } catch (error) {
        console.log("error occur while updating profile",error);
        return res.status(500).json({
            success:false,
            message:"profile not updated try again",
            error:error.message
        })        
    }
}

exports.updateProfilePicture=async(req,res)=>{
    try {
        const displayPicture = req.files.displayPicture
        
        const userId = req.user.id
        const image = await imageUploadeCloudinary(
          displayPicture,
          process.env.FOLDER_NAME
        )
       
        const updatedProfile = await User.findByIdAndUpdate(
          { _id: userId },
          { image: image.secure_url },
          { new: true }
        )
        res.send({
          success: true,
          message: `Image Updated successfully`,
          data: updatedProfile,
        })
      } catch (error) {
        console.log("Error occur while Profile upload",error);
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}


exports.getEnrolledCourse = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)

          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseId: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completeVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  

exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData,message:"data fetch..." })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
  }
  
