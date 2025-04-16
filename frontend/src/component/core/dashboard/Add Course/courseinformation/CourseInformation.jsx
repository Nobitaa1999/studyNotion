import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategory,addCourseDetails,editCourseDetails } from '../../../../../services/operation/courseApi';
import { useForm, SubmitHandler } from "react-hook-form"
import ChipInput from './ChipInput';
import Upload from '../Upload';
import RequirementField from './RequirementField';
import { toast } from 'react-hot-toast';
import {setStep,setCourse} from '../../../../../slices/courseSlice'
import Iconbtn from '../../../../common/Iconbtn'
const CourseInformation = () => {
    const{register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();

    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth)
    const {course,editCourse}=useSelector((state)=>state.course)
    const[loading,setLoading]=useState(false);
    const[courseCategories,setCourseCategories]=useState([]);
    useEffect(()=>{
        const getCategories=async()=>{
            setLoading(true);
            const categories=await fetchCourseCategory()
            if(categories.length>0){
                setCourseCategories(categories)
            }
            setLoading(false);
        }
        if(editCourse){
            setValue("courseTitle",course.courseName)
            setValue("courseShortDesc",course.courseDescription)
            setValue("coursePrice",course.price)
            setValue("courseTags",course.tag)
            setValue("courseBenefits",course.whatYouWillLearn)
            setValue("courseCategory",course.category)
            setValue("courseRequirment",course.instructions)
            setValue("courseImage",course.thumbnailImage)
        }
        getCategories();
    },[])

    const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.courseTitle!== course.courseName ||
            currentValues.courseShortDesc!== course.courseDescription ||
            currentValues.coursePrice!== course.price ||
            currentValues.courseBenefits!== course.whatYouWillLearn ||
            currentValues.courseCategory._id!== course.category._id ||
            currentValues.courseRequirment.toString()!== course.instructions.toString()||
            currentValues.courseImage!== course.thumbnailImage||
            currentValues.courseTags.toString() !== course.tag.toString()
            )
        return true;
        else return false;

    }   

    const onSubmit=async(data)=>{
        if(editCourse){
            if(isFormUpdated()){
                const currentValues=getValues();
            const formData=new FormData()
            formData.append("courseId",course._id)

            if(currentValues.courseTitle!==course.courseName){
                formData.append("courseName",data.courseTitle)
            }

            if(currentValues.courseShortDesc!==course.courseDescription){
                formData.append("courseDescription",data.courseShortDesc)
            }

            if(currentValues.coursePrice!==course.price){
                formData.append("price",data.coursePrice)
            }

            if(currentValues.courseBenefits!==course.whatYouWillLearn){
                formData.append("whatYouWillLearn",data.courseBenefits)
            }
            if(currentValues.courseImage!==course.thumbnailImage){
                formData.append("thumbnailImage",data.courseImage)
            }
            if(currentValues.courseTags!==course.tag){
                formData.append("tag",data.courseTags)
            }

            if(currentValues.courseCategory._id!==course.category._id){
                formData.append("category",data.courseCategory)
            }

            if(currentValues.courseRequirment.toString()._id!==course.instructions.toString()){
                formData.append("instructions",JSON.stringify(data.courseRequirment))
            }

            setLoading(true);
            const result=await editCourseDetails(formData,token);
            setLoading(false)
            if(result){
                dispatch(setStep(2))
                dispatch(setCourse(result));
            }
            }
            else{
                toast.error("No changes is done in form")
            }
            return ;
        }


        const formData=new FormData();
        formData.append("courseName",data.courseTitle);
        formData.append("courseDescription",data.courseShortDesc);
        formData.append("price",data.coursePrice);
        formData.append("whatYouWillLearn",data.courseBenefits);
        formData.append("category",data.courseCategory);
        formData.append("thumbnailImage",data.courseImage);
        formData.append("tag",data.courseTags);
        formData.append("instructions",JSON.stringify(data.courseRequirment));
        formData.append("status","Draft");

        setLoading(true);
        const result=await addCourseDetails(formData,token)
        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false);
        console.log("result",result);
    }
   
    return (
    <form onSubmit={handleSubmit(onSubmit)} className='rounded-md bg-richblack-600 border-richblack-500 px-6 py-3 flex flex-col gap-5 '>
        
        <div className='flex flex-col gap-1'>
            <label htmlFor='courseTitle' className='text-white text-sm'>Course Title<sup className='text-pink-700'>*</sup></label>
            <input
            id="courseTitle" placeholder='Enter course title'
            {...register("courseTitle",{required:true})}
            className='w-full rounded-md p-2 bg-richblack-500'
            />
            {
                errors.courseTitle &&(
                    <span>Course Title is required</span>
                )
            }
        </div>
        <div className='flex flex-col gap-1'>
            <label htmlFor='courseShortDesc' className='text-white text-sm'>Course Short Description<sup className='text-pink-700'>*</sup></label>
            <textarea
            rows={5}
            id="courseShortDesc" placeholder='Enter course Description'
            {...register("courseShortDesc",{required:true})}
            className='w-full rounded-md p-2 bg-richblack-500'
            />
            {
                errors.courseShortDesc &&(
                    <span>Course Title is required</span>
                )
            }
        </div>
        <div className='flex flex-col gap-1'>
            <label htmlFor='coursePrice' className='text-white text-sm'>Course Price<sup className='text-pink-700'>*</sup></label>
            <input
            id="coursePrice" placeholder='xxxx'
            {...register("coursePrice",{required:true,
                valueAsNumber:true
            })}
            className='w-full rounded-md p-2 bg-richblack-500'
            />
            
            {
                errors.coursePrice &&(
                    <span>Course Price is required</span>
                )
            }
        </div>

        <div className='flex flex-col gap-1'>
            <label htmlFor='courseCategory'  className='text-white text-sm'>Course Category<sup className='text-pink-700'>*</sup></label>
            <select id="courseCategory"
            defaultValue=""
            {...register("courseCategory",{require:true})}
            className='w-full rounded-md p-2 bg-richblack-500'
            >
                <option value="" disabled>Choose a Category</option>
                {!loading && courseCategories.map((category,ind)=>(
                    <option value={category?._id} key={ind}>{category?.name}</option>)
                )
                }

            </select>
            {
                errors.courseCategory &&(
                    <span>Course Category is required</span>
                )
            }
        </div>
        <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter"
        errors={errors}
        setValue={setValue}
        getValue={getValues}
        register={register}
       
        />
 <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
        className="max-h-[20vh] overflow-y-auto"
      />
        

<div className='flex flex-col gap-1'>
            <label htmlFor='courseBenefits' className='text-white text-sm'>Benifit of the course<sup className='text-pink-700'>*</sup></label>
            <textarea
            rows={3}
            id="courseBenefits" placeholder='Enter course Description'
            {...register("courseBenefits",{required:true})}
            className='w-full rounded-md p-2 bg-richblack-500'
            />
            {
                errors.courseBenefits &&(
                    <span>Course benefit is required</span>
                )
            }
        </div>

        <RequirementField
        name="courseRequirements"
        label="Reqiurement/Instruction"
        register={register}
        errors={errors}
        getValue={getValues}
        setValue={setValue}
        />

        <div className='flex  justify-end'>
            {
                editCourse && (
                    <button
                    onClick={()=>dispatch(setStep(2))}
                    className=''
                    >
                        Continue without saving
                    </button>
                )
            }
             <Iconbtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          {/* <MdNavigateNext /> */}
        </Iconbtn>
        
        </div>


    </form>
  )
}

export default CourseInformation