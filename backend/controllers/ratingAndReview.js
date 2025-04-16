const RatingAndReview=require('../models/RatingAndReview');
const Course=require("../models/Course")

exports.createRatingAndReview=async(req,res)=>{
    try {
        const{rating,review,courseId}=req.body;
        const userId=req.user.id;
        const findCourse=await Course.findOne({
                                                _id:courseId
                                            })
        if(!findCourse){
            return res.status(400).json({
                success:false,
                message:"course not found while creating review"
            })
        }
        const isUserEnrolled=findCourse.studentEnrolled.includes(userId);
        
        if(!isUserEnrolled){
            return res.status(400).json({
                success:false,
                message:"user not enroll in that course so user not allow to review"
            })
        }
      
        const isReviewDone= await RatingAndReview.findOne({
                                                            user:userId,course:courseId
                                                            })
        if(isReviewDone){
            return res.status(400).json({
                success:false,
                message:"user reviewed the course earlier so user not allow to review"
            })
        }

        const ratingReview=await RatingAndReview.create({
                                                    rating,review,
                                                    course:courseId,
                                                    user:userId
                                                })
        await Course.findByIdAndUpdate(courseId,
                                                {
                                                    $push:{
                                                        ratingAndReviews:ratingReview._id,
                                                        }
                                                },
                                                    {new:true}
                                      )
        return res.status(200).json({
            success:true,
            message:"Review is created"
        })
        
    } catch (error) {
        console.log('Error occur while creating the review',error);
        return res.status(500).json({
            success:false,
            message:`Error occur while creating the review : ${error.meaage}`
        })        
    }
}

exports.avarageReview=async(req,res)=>{
    try {
        const courseId=req.body.courseId;
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    id:null,
                    avarageRating:{
                        $avg:"$rating"
                    }
                }
            },

        ])
        if(result.length>0){
            return res.status(200).json({
                success:true,
                avarageRating:result[0].avarageRating
            })
        }
       
            return res.status(200).json({
                success:true,
                message:"rating is not given by user so rating is set to 0",
                avarageRating:0
            })   
    } catch (error) {
        console.log("error occure while calculating avarage rating",error);
        return res.status(500).json({
            success:false,
            message:"avarege is not calculated",
            error :error.message
        })
    }
}

exports.getAllRating=async(req,res)=>{
    try {
        const allReview=await RatingAndReview.find({}).sort({rating:"desc"})
                                                .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image"
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName"
                                                })
        return res.status(200).json({
            success:true,
            message:'all review are fatched',
            allReview
        })                                                                                          
    } catch (error) {
        console.log("error occure while getting all rating",error);
        return res.status(500).json({
            success:false,
            message:"something went wrong during getting all review"
        })
    }
}