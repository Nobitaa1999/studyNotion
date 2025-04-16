const Category=require('../models/Category')
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

exports.createCategory=async(req,res)=>{
    try {
        const{name,description}=req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }
        const categoryDetails=await Category.create({
            name:name,
            description:description
        }) 
        return res.status(200).json({
            success:true,
            message:"Category is created",
            categoryDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })        
    }
}

exports.showAllCategory=async(req,res)=>{
    try {
        const allCategory=await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            data:allCategory,
            message:"all category are fatched"

        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// exports.categoryPageDetails=async(req,res)=>{
//     try {
//         const{categoryId}=req.body;
//         const selectedCategory=await Category.findById(categoryId).populate("course").exec();
//         console.log(selectedCategory);
//         if(!selectedCategory){
//             return res.status(400).json({
//                 success:false,
//                 message:"Category not found"
//             })
//         }
//         if(selectedCategory.course.length===0){
//             console.log("No course found for this category");
//             return res.status(400).json({
//                 success:true,
//                 message:"No course found for this category"
//             })
//         }
//         const selectedCourses=selectedCategory.course;
//         const categoriesExceptSelected=await Category.find({
//             _id:{$ne:categoryId}
//         }).populate("course");

//         let differentCourse=[];
//         for(const category of categoriesExceptSelected ){
//             differentCourse.push(...category.course);
//         }

//         const allCategories=await Category.find().populate("course");
//         const allCourse=allCategories.flatMap((category)=>category.course);
//         const mostSellingCourse=allCourse.sort((a,b)=>b.sold-a.sold).slice(0,10);
//         return res.status(200).json({
//             selectedCourses:selectedCourses,
//             differentCourse:differentCourse,
//             mostSellingCourse:mostSellingCourse
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Internal sever error",
//             error:error.message
//         })
//     }
// }

exports.categoryPageDetails = async (req, res) => {
    try {
      const  {categoryId}  = req.body
      // const categoryId='679a0b93a102677a38dda8b6'
      console.log("PRINTING CATEGORY ID: ", categoryId);

      if (!categoryId ) {
        return res.status(400).json({
            success: false,
            message: "Invalid categoryId",
        });
    }
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      // console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      
      if (selectedCategory.course.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
    
  
      // Get courses for other categories
      
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
   
      let differentCategory=[];
        if(categoriesExceptSelected.length>0){
       differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "course",
          match: { status: "Published" },
        })
        .exec()
      }else{
        console.log("No categories available.");
        differentCategory = []
      }
        
        // console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.course)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
      //  console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
