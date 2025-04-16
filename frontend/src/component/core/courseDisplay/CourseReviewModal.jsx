import React, { useEffect,useState } from 'react'
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component"
import Iconbtn from '../../common/Iconbtn';
import {createRating} from '../../../services/operation/courseApi'

const CourseReviewModal = ({ setReviewModal }) => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const [rating, setRating] = useState(0)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(()=>{
    setValue("courseExperience","")
    setValue("courseRating",0)
  },[setValue])

  const onSubmit=async(data)=>{
    console.log("data",data);
    await createRating({
      courseId:courseEntireData._id,
      rating:data.courseRating,
      review:data.courseExperience},
      token
    )
    setReviewModal(false);
  }
  const ratingChanged=(newRating)=>{
    setRating(newRating)
    // console.log(newRating)
    setValue("courseRating",newRating)
  }
  

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 '>
      <div className='bg-richblack-500 text-richblack-50   rounded-lg shadow-lg w-2/5 max-w-sm'>
        <div className='bg-richblack-600 flex justify-between rounded-t-lg p-2'>
          <p className='text-white font-semibold'>Add Review</p>
          <span onClick={() => setReviewModal(false)} ><RxCross2 /></span>
        </div>

        <div className='flex justify-center  mt-4 mb-2 gap-2 text-white'>
          <img src={user.image} alt={`${user.firstName} image`}
            className='aspect-square w-[50px] rounded-full object-cover' />
          <div className='flex flex-col leading-none'>
            <p className='text-2xl font-bold' >{user.firstName} {user.lastName}</p>
            <span>Publicly posting</span>
          </div>
        </div>


        <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              value={rating}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style resize-x-none min-h-[100px] w-full"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-100 py-[8px] px-2 font-semibold text-richblack-900`}
              >
                Cancel
              </button>
              <Iconbtn text="Save" />
            </div>
          </form>





      </div>
    </div>
  )
}

export default CourseReviewModal