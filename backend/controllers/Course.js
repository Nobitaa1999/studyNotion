const { imageUploadeCloudinary } = require('../utils/imageUploadToCloudinary');
const Course = require('../models/Course')
const CourseProgress = require('../models/CourseProgress')
const Category = require('../models/Category')
const User = require('../models/User')
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { convertSecondsToDuration } = require("../utils/secToDuration")

exports.createCourse = async (req, res, next) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;
        
        const thumbnail = req.files.thumbnailImage;
        
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',

            })
        }
        const userId = req.user.id;
        const instructorDetail = await User.findById(userId);
        console.log("Instructor detail ", instructorDetail);
        if (!instructorDetail) {
            return res.status(400).json({
                success: false,
                message: "instructor is not found"
            })
        }
        const categoryDetail = await Category.findById(category);
        if (!categoryDetail) {
            return res.status(400).json({
                success: false,
                message: "Category is not found"
            })
        }

        const thumbnailImage = await imageUploadeCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetail._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: categoryDetail.name,
            category: categoryDetail._id,
            thumbnail: thumbnailImage.secure_url
        })
        await User.findByIdAndUpdate(instructorDetail._id, { $push: { courses: newCourse._id } }, { new: true })
        await Category.findByIdAndUpdate(category, { $push: { course: newCourse._id } }, { new: true })
        return res.status(200).json({
            success: true,
            message: "course is created successfully",
            data: newCourse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "post is not created",
            error: error.message
        })
    }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      console.log("Request body:", req.body);
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await imageUploadeCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetail",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentEnrolled: true
        }).populate("instructor").exec();
        return res.status(200).json({
            success: true,
            message: "all course fatched",
            data: allCourses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).josn({
            success: false,
            message: "can't fatch course"
        })

    }
}

exports.getCourseDetail = async (req, res) => {
    try {
        const  {courseId } = req.body;
        console.log("course", courseId);
        const courseDetail = await Course.findById({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetail"
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                    select: "-videoUrl",
                }
            })
            .populate("ratingAndReviews")
            .populate("category")
            // .populate({
            //     path: "studentEnrolled",
            //     populate: {
            //         path: "additionalDetail"
            //     }
            // })
            .exec();

        if (!courseDetail) {
            return res.status(400).json({
                success: false,
                message: "could not find course"
            })
        }
        // console.log(courseDetail);
        return res.status(200).json({
            success: true,
            message: "get all the detail of course",
            courseDetail
        })

    } catch (error) {
        console.log('error occure while get detail from course', error);
        return res.status(500).json({
            success: false,
            message: "somthing went wrong course not fetch",
            error: error.message
        })
    }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



exports.instructorCourse = async (req, res) => {

    try {
        const instructorId = req.user.id;
        if (!instructorId) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found"
            })
        }
        const result = await Course.find({ instructor: instructorId }).sort({ createdAt: -1 })
        res.status(200).json({
            success: true, 
            data: result,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id;
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
      await User.findByIdAndUpdate(userId, {
        $pull: { courses: courseId },
      })
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }