import { apiConnector } from "../apiconnector"
import { coursesEndPoints,categories } from "../apis"
import { toast } from "react-hot-toast"
import {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
} from "../../slices/courseDetailSlice"
const { GET_INSTRUCTOR_COURSES_API,DELETE_COURSE_API,CREATE_COURSE_API,EDIT_COURSE_API,CREATE_SECTION_API,UPDATE_SECTION_API,DELETE_SUBSECTION_API,DELETE_SECTION_API,CREATE_SUBSECTION_API,UPDATE_SUBSECTION_API, GET_FULL_COURSE_DETAILS_AUTHENTICATED,GET_ALL_COURSES,FETCH_COURSE_DETAILS,CREATE_RATING_API,LECTURE_COMPLETION_API, } = coursesEndPoints;
const {CATAGORIES_API}= categories;

export const fetchInstructorCourses = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try { 
        const response = await apiConnector(
            "GET",
            GET_INSTRUCTOR_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("INSTRUCTOR COURSES API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getAllCourses=async()=>{
  const toastId=toast.loading("Loading...");
  let result=[];
  try {
    const response=await apiConnector("GET",GET_ALL_COURSES);
    console.log("All courses..",response);
    if(!response?.data?.success){
      throw new Error("Could Not Fetch Courses from all courses")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("ALL COURSES API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result

}


export const fetchCourseDetails=async(courseId)=>{
  const toastId=toast.loading("Loading...")
  let result=null
  try {
    // console.log("course id",courseId);
    const response=await apiConnector("POST",FETCH_COURSE_DETAILS,{courseId})
    console.log("Course detail api response",response);
    if(!response?.data?.success){
      throw new Error(response.data.message)
    }
    result=response.data
  } catch (error) {
    console.log("Error in fetching course detail..",error);
        
  }
  toast.dismiss(toastId);
  return result;

}

// add the course details
export const addCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
    toast.success("Course Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    // const response = await apiConnector("POST", EDIT_COURSE_API, data, {
    //   "Content-Type": "multipart/form-data",
    //   Authorization: `Bearer ${token}`,
    // })
    console.log("dataaa",data);
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Course")
      }
      toast.success("Course Deleted")
    } catch (error) {
      console.log("DELETE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }


export const fetchCourseCategory=async ()=>{
  
  let result=[];
  try {
    const response=await apiConnector("GET",CATAGORIES_API);
    console.log("COURSE CATEGORY API RESPONSE...",response);
    if(!response?.data?.success){
      throw new Error("Could not fetch course category")
    }
    result=response?.data?.data;
  } catch (error) {
    console.log("Categories are not fetched...",error);
    toast.error(error.message)
  }
  return result;

}


export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
   
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatedCourseDetail
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  
  return result
}


export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {

    const response = await apiConnector("PUT", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    
    const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}



export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}


export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}



export const fetchCourseDetailsRedux = (courseId) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading course details...")

    try {
      const response = await apiConnector("POST", FETCH_COURSE_DETAILS, {
        courseId,
      })

      if (!response?.data?.success) {
        throw new Error(response.data.message)
      }
            
      const courseDetails = response?.data?.courseDetail
      const completedVideos = response?.data?.data?.completedVideos || []
      
      dispatch(setEntireCourseData(courseDetails))
      dispatch(setCourseSectionData(courseDetails.courseContent))
      dispatch(setTotalNoOfLectures(getTotalLectures(courseDetails.courseContent)))
      dispatch(setCompletedLectures(completedVideos))

    } catch (error) {
      console.error("Redux Thunk Error - fetchCourseDetailsRedux:", error)
      console.log("haii");
      toast.error("Could not load course detailss.")
    } finally {
      toast.dismiss(toastId)
    }
  }
}

const getTotalLectures = (courseContent) => {
  let total = 0
  courseContent.forEach(section => {
    total += section.subSection.length
  })
  return total
}