import React from 'react'
import copy from 'copy-to-clipboard';
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { FaShare } from "react-icons/fa";
import { toast } from "react-hot-toast"
import {addToCart} from "../../../slices/cartSlice"


const CourseDetailsCard = ({course,setConfirmationModal,buyCourse}) => {
    const {user}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const{thumbnail,price,instruction}=course
    
    const handleAddToCart=()=>{
      if(user && user?.accountType==="Instructor"){
        toast.error("Instructor can't buy course")
        return ;
      }
      if(token){
        dispatch(addToCart(course))
        return ;
      }
      setConfirmationModal({
        text1:"You are not logged in",
        btn1text:"log in",
        btn1Handler:()=>navigate("/login"),
        text2:"Please login to add to cart",
        btn2text:"cancle",
        btn2Handler:()=>setConfirmationModal(null),
      })

    }
    // console.log("printing..",course?.studentEnrolled);
  return (
    <div>
        <div className=' lg:h-[160px]'>
        <img src={thumbnail} alt="course_image" className="w-full h-full object-fill rounded-md aspect-video" />
        </div>
        <div>
        <div className='text-2xl font-bold my-4 mx-2'>
           {`Rs. ${price}`} 
        </div>
        <div className='flex flex-col gap-4'>
            <button
            onClick={
              user && course?.studentEnrolled.includes(user?._id)?
              ()=>navigate("/dashboard/enrolled-courses")
              : buyCourse
            }
            className='py-1 px-2 bg-yellow-400 text-black rounded-md w-full'
            >
              {user && course?.studentEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {
              (!course?.studentEnrolled.includes(user?._id))&& (
                <button
                onClick={handleAddToCart}
                className='py-1 px-2 bg-yellow-400 text-black rounded-md w-full'>
                  Add to cart

                </button>
              )
            }

        </div>

        <div className='flex flex-col justify-start my-3 '>
          <p className='text-ms text-richblack-110 mx-auto my-3'>30 day money back guarantee</p>
          <p className='text-xl font-medium'>This Course Includes:</p>
          <div className='flex flex-col gap-y-1'>
            {
              course.instruction.map((item,ind)=>{
                <p key={ind}>{item}</p>
              })
            }
          </div>
        </div>

        <div className='font-semibold text-yellow-500 flex gap-2 items-center justify-center my-4 cursor-pointer p-1'
        onClick={()=>{
          copy(window.location.href)
          toast.success("copy to clipboard")
        }}>
        <FaShare />
        <span>Share</span>
        </div>
        </div>

    </div>
  )
}



export default CourseDetailsCard