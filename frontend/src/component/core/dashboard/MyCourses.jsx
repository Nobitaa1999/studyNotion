import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import InstructorCourseTable from "./InstructorCourseTable"
import { fetchInstructorCourses } from "../../../services/operation/courseApi"
import IconBtn from "../../common/Iconbtn"

const MyCourses = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
  
    useEffect(() => {
      const fetchCourses = async () => {
        const result = await fetchInstructorCourses(token)
        if (result) {
          setCourses(result)
        }
      }
      fetchCourses()
      
    }, [])
  
    return (
      <div>
        <div className="mb-14 flex items-center justify-between">
          <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
          <IconBtn
            text="Add Course"
            onclick={() => navigate("/dashboard/add-course")}
          >
            <VscAdd />
          </IconBtn>
        </div>
        {courses && <InstructorCourseTable courses={courses} setCourses={setCourses} />}
      </div>
    )
  }

export default MyCourses