import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operation/courseApi'
import { setCourse } from '../../../../../slices/courseSlice'
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx";
import Upload from "../Upload"
import Iconbtn from "../../../../common/Iconbtn"
const SubSectionModal = ({
  modalData,
  setModalData,
  add=false,
  view=false,
  edit=false
}) => {

  const{
    register,
    handleSubmit,
    setValue,
    formState:{errors},
    getValues,
  }=useForm(
    {
      defaultValues: {
        lectureDuration: "", 
      },
    }
  )

  const dispatch=useDispatch();
  const[loading,setLoading]=useState()

  const {course}=useSelector((state)=>state.course)
  const {token}=useSelector((state)=>state.auth)

  useEffect(()=>{
    // console.log("Modal Data:", modalData);
    if(view || edit){
      setValue("lectureTitle",modalData.title)
      setValue("lectureDesc",modalData.description)
      setValue("lectureVideo",modalData.videoUrl)
      setValue("lectureDuration",modalData.timeDuration)
    }
  },[])

  const handleEditSubSection=async()=>{
    const currentValues=getValues();
    const formData=new FormData();
    formData.append("sectionId",modalData.sectionId)
    formData.append("subSectionId",modalData._id)
    if(currentValues.lectureTitle !==modalData.title){
      formData.append("title",currentValues.lectureTitle)
    }
    if(currentValues.lectureDesc !==modalData.description){
      formData.append("description",currentValues.lectureDesc)
    }
    if(currentValues.lectureVideo !==modalData.videoUrl){
      formData.append("file",currentValues.lectureVideo)
    }

    setLoading(true)
    const result=await updateSubSection(formData,token)
      if(result){
        const updatedCourseContent=course.courseContent.map((section)=>section._id===modalData.sectionId ? result : section);
            const updatedCourse={...course,courseContent:updatedCourseContent}

        dispatch(setCourse(updatedCourse))
      }
    setModalData(null);
    setLoading(false);

  }

  const isFormUpdated=()=>{
    const currentValues=getValues();
    if(currentValues.lectureTitle!== modalData.title ||
      currentValues.lectureDesc!== modalData.description ||
      currentValues.lectureVideo!== modalData.videoUrl){
        return true
      }else{
        return false;
      }
  }

  const onSubmit=async(data)=>{
    console.log("Form Data Before Submission:", data);
    if(view){
      return;
    }
    if(edit){
      if(!isFormUpdated){
        toast.error("No changes made to the form")
      }else{
        handleEditSubSection();
      }
      return;
    }
    
    const formData=new FormData();
  
    formData.append("sectionId",modalData)
    formData.append("description",data.lectureDesc)
    formData.append("title",data.lectureTitle)
    formData.append("timeDuration", data.lectureDuration || "00:00")
    formData.append("file",data.lectureVideo)
    
    setLoading(true)
   
  
    const result=await createSubSection(formData,token);

    if(result){
      const updatedCourseContent=course.courseContent.map((section)=>section._id===modalData ? result : section);
            const updatedCourse={...course,courseContent:updatedCourseContent}
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)

  }

  return (
    <div className="fixed !mt-0 inset-0 z-[1000]  grid h-screen w-screen place-items-center overflow-auto bg-opacity-10 bg-white  backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">{view && "viewing"}{add && "adding"}{edit && "editing"} {"lecture"}</p>
          <button onClick={() => !loading && setModalData(null)}><RxCross2 /></button>
          
        </div>
        <form onSubmit={handleSubmit(onSubmit)}className="space-y-8 px-8 py-10">
          <Upload
          name='lectureVideo'
          label="Lecture Video"
          register={register}
          setValue={setValue}
          errors={errors}
          video={true}
          viewData={view?modalData.videoUrl:null}
          editData={edit?modalData.videoUrl:null}
          />
          <div className="flex flex-col space-y-2">
            <label htmlFor='lectureTitle' className="text-sm text-richblack-5" >Course Title<sup className='text-pink-700'>*</sup></label>
            <input
            id="lectureTitle" placeholder='Enter course title'
            {...register("lectureTitle",{required:true})}
            className='w-full rounded-md p-2 bg-richblack-500'
            />
            {
                errors.lectureTitle &&(
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Title is required</span>
                )
            }
        </div>
        <div className="flex flex-col space-y-2">
            <label htmlFor='lectureDesc' className='text-white text-sm'>Description<sup className='text-pink-700'>*</sup></label>
            <textarea
            rows={5}
            id="lectureDesc" placeholder='Enter Description'
            {...register("lectureDesc",{required:true})}
            className='w-full rounded-md p-2 bg-richblack-500'
            />
            {
                errors.lectureDesc &&(
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Desc is required</span>
                )
            }
        </div>
        {
          !view &&(<div className="flex justify-end">
            <Iconbtn
            text={loading ? "Loading...":edit?"Save Changes":"Save"}>

            </Iconbtn>
          </div>)
        }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal