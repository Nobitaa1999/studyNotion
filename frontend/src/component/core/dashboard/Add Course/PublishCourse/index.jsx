import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Iconbtn from '../../../../common/Iconbtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operation/courseApi';
const PublishCourse = () => {
    const { register, handleSubmit, setValue,getValues, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const handleCoursePublish=async()=>{
        if(course?.status==="Published" && getValues("public")===true || (course?.status==="Draft" && getValues("public")===false)){
            goToCourses();
            return;
        }
        const formData=new FormData()
        formData.append("courseId",course._id)
        const courseStatus=getValues("public")?"Published":"Draft"
        formData.append("status",courseStatus)
        setLoading(true)
        const result=await editCourseDetails(formData,token)
        console.log("result",result);
        if (result){
            goToCourses();
        }
        setLoading(false)
    }
    const goToCourses=()=>{
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }
    const onSubmit = () => {
        handleCoursePublish();
    }
    const goBack = () => {
        dispatch(setStep(2));

    }
    useEffect(() => {
      if(course?.status==="Published")
      setValue("public",true)
    }, [])
    
    return (
        <div className='rounded-md border-[1px] bg-richblack-500 border-richblack-100 p-3'>
            <p className="text-2xl font-semibold text-richblack-5">Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-6 mb-8">
                    <label htmlFor="public" className="inline-flex items-center text-lg">
                        <input
                            type="checkbox"
                            id="public"
                            {...register("public")}
                            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                        />
                        <span className="ml-2 text-richblack-400">
                            Make this course as public
                        </span>
                    </label>

                </div>

                <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-700 py-[8px] px-[20px] font-semibold text-white"
          >
            Back
          </button>
          <Iconbtn disabled={loading} text="Save Changes" />
        </div>
            </form>


        </div>
    )
}

export default PublishCourse