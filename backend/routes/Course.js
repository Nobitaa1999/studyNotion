const express=require("express")
const router=express.Router();

const{createCourse,showAllCourses,getCourseDetail,instructorCourse,deleteCourse,editCourse,getFullCourseDetails}=require("../controllers/Course")
const {createCategory,showAllCategory,categoryPageDetails}=require("../controllers/Category")
const{createSectionCreate,updateSection,deleteSection}=require("../controllers/Section")
const{createSubSection,updateSubSection,deleteSubSection}=require("../controllers/Subsection")
const{createRatingAndReview,avarageReview,getAllRating}=require("../controllers/ratingAndReview")
const{auth,isAdmin,isInstructor,isStudent}=require("../middleware/auth")

const {
    updateCourseProgress
  } = require("../controllers/CourseProgress");


router.post("/create-course",auth,isInstructor,createCourse)
router.post("/edit-course", auth, isInstructor, editCourse)
router.get("/getAllCourses",showAllCourses)
router.post("/get-course-detail",getCourseDetail)
router.get("/fetch-instructor-course",auth,isInstructor,instructorCourse)
router.delete("/delete-course",auth,isInstructor,deleteCourse)
router.post("/get-full-course-details", auth, getFullCourseDetails)


router.post("/create-section",auth,isInstructor,createSectionCreate)
router.put("/update-section",auth,isInstructor,updateSection)
router.delete("/delete-section",auth,isInstructor,deleteSection)



router.post("/add-subsection",auth,isInstructor,createSubSection)
router.put("/update-subsection",auth,isInstructor,updateSubSection)
router.delete("/delete-subsection",auth,isInstructor,deleteSubSection)



router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategories",showAllCategory)
router.post("/show-category-pagedetail",categoryPageDetails)



router.post("/createRating",auth,isStudent,createRatingAndReview)
router.get("/getAvarageRating",avarageReview)
router.get("/getReviews", getAllRating)


router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

module.exports=router