import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Iconbtn from '../../../../common/Iconbtn';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse,setStep } from '../../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operation/courseApi';
import NestedView from './NestedView';
const CourseBuilderForm = () => {
  const {register,handleSubmit,setValue,formState:{errors}}=useForm();
  const [editSectionName,setEditSectionName]=useState(null);
  const dispatch=useDispatch();
  const{token}=useSelector((state)=>state.auth)
  const{course}=useSelector((state)=>state.course)
  const [loading,setLoading]=useState(false);
  const goBack=()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }
  const goToNext=()=>{
    if(course.courseContent.length===0){
      toast.error("Please add atleast one section")
      return ;
    }
    if(course.courseContent.some((section)=>section.subSection.lenght===0)){
      toast.error("Please add atleast one lecture in each section")
      return ;
    }
    dispatch(setStep(3))
  }
  const cancleEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","")
  }
  const onSubmit=async(data)=>{
    setLoading(true);
    let result;
    if(editSectionName){
      result=await updateSection({
        sectionName:data.sectionName,
        sectionId:editSectionName,
        courseId:course._id
      },token)
    }
    else{
      result=await createSection({
        sectionName:data.sectionName,
        courseId:course._id
      },token)
    }
    if(result){
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName","")
    }
    setLoading(false);
    
  }
  

  const handleChangeEditSectionName=(sectionId,sectionName)=>{
    if(editSectionName===sectionId){
      cancleEdit();
      return ;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName)
  }

  return (
    <div className='rounded-md bg-richblack-700 border-richblack-700 px-6 py-3 flex flex-col gap-6'>
      <p>Course Builder</p>
       <form onSubmit={handleSubmit(onSubmit)} 
      className=' flex flex-col gap-2' 
      >
      <div className='flex flex-col gap-1'>
            <label htmlFor='sectionName' className='text-white text-sm'>Course Title<sup className='text-pink-700'>*</sup></label>
            <input
            id="sectionName" placeholder='Add section name'
            {...register("sectionName",{required:true})}
            className='w-full rounded-md p-2 bg-richblack-500'
            />
            {
                errors.sectionName &&(
                    <span>Section Name is required</span>
                )
            }
        </div>
        <div className=''>
          <Iconbtn
          type="Submit"
          text={editSectionName?"Edit Section Name":"Create Section"}
          outline={true}
         
          ><IoAddCircleOutline className='text-lg font-semibold'/></Iconbtn>
           {
            editSectionName && (
              <button type="button" onClick={cancleEdit}
              className='text-sm text-richblack-50 px-2 underline'>
                 Cancle edit
              </button>
            )
           }
        </div>
      </form>
      
      {course.courseContent.length>0 &&(
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      <div className='flex justify-end gap-x-3 mt-3' >
        <button onClick={goBack} className='rounded-md cursor-pointer flex items-center' >Back</button>
        <Iconbtn text="Next" onclick={goToNext} ><FaRegArrowAltCircleRight /></Iconbtn>
      </div>


    </div>
  )
}

export default CourseBuilderForm