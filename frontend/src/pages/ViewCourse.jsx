import React, {useState,useEffect} from 'react'
import {Outlet,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getFullDetailsOfCourse } from '../services/operation/courseApi'
import VideoDetailSidebar from '../component/core/courseDisplay/VideoDetailSidebar'
import CourseReviewModal from '../component/core/courseDisplay/CourseReviewModal'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/courseDetailSlice'


const ViewCourse = () => {

  const[reviewModal,setReviewModal]=useState(false);
  const{courseId}=useParams();
  const{token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();

  useEffect(()=>{
    const setCourseSpecificDetails=async()=>{
      const courseData=await getFullDetailsOfCourse(courseId,token);
      console.log("course..",courseData);
      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
      dispatch(setEntireCourseData(courseData?.courseDetails))
      dispatch(setCompletedLectures(courseData?.completedVideos))
      
      let lectures=0;
      courseData?.courseDetails?.courseContent.forEach((section)=>{
        lectures+=section.subSection.length || 0;
      })
      dispatch(setTotalNoOfLectures(lectures))

    }
    setCourseSpecificDetails();
  },[])

  return (
    <div>
    <div className=' flex min-h-[calc(100vh-3.5rem)]'>
      <VideoDetailSidebar setReviewModal={setReviewModal}/>
      <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
      
          <Outlet/>
        
      </div>

     
    </div>
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal } />}
    </div>
  )
}

export default ViewCourse