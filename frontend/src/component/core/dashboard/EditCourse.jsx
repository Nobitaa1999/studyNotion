import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderStep from './Add Course/RenderStep';
import { getFullDetailsOfCourse } from '../../../services/operation/courseApi';
import { setCourse, setEditCourse } from '../../../slices/courseSlice';


const EditCourse = () => {
    const dispatch=useDispatch();
    const {courseId}=useParams()
    const {course}=useSelector((state)=>state.course)
    const [loading,setLoading]=useState(false)
    const {token}=useSelector((state)=>state.auth)
    
    useEffect(()=>{
        const populateCourseDetails=async()=>{
            setLoading(true);
            const result=await getFullDetailsOfCourse(courseId,token)
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false);
        }
        populateCourseDetails();
    },[])
    
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

  return (
    <div className='text-richblack-5'>
        <h2 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h2>
        <div className="mx-auto max-w-[600px]">
            {
                course ?
                (<RenderStep/>)
                :
                (<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                    Course not found
                 </p>
                )
            }
        </div>
        
    </div>
  )
}

export default EditCourse