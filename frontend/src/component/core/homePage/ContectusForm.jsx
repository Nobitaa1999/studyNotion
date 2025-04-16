import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
const ContectusForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register, handleSubmit, reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("logging data",data);
        try {
            setLoading(true);
            const response={status:"OK"};
            setLoading(false)
        } catch (error) {
            console.log("Error",error.message)
            setLoading(false)
        }
    }
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: ""
            })
        }
    }, [isSubmitSuccessful, reset])

    return (
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex flex-col gap-4 pb-10 '>
                <div className='flex gap-4'>
                    <div className='flex flex-col'>
                        <label htmlFor='firstname'>First Name</label>
                        <input type="text" name='firstname' id='firstname' placeholder='Enter First Name' style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-2  text-richblack-5'
                            {...register("firstname", { required: true })} />
                        {
                            errors.firstname && (
                                <span className='text-red-600'>
                                    Please enter your name
                                </span>
                            )
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='lastname'>Last Name</label>
                        <input type="text" name='lastname' id='lastname' placeholder='Enter last Name' style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-2  text-richblack-5'
                            {...register("lastname", { required: true })} />
                        {
                            errors.lastname && (
                                <span className='text-red-600'>
                                    Please enter your lastname
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='email'>Email</label>
                    <input type="text" name='email' id='email' placeholder='Enter Email' style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-2  text-richblack-5'
                        {...register("email", { required: true })} />
                    {
                        errors.email && (
                            <span className='text-red-600'>
                                Please enter email
                            </span>
                        )
                    }
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='phoneNo'>Phone No</label>

                    <input type="number" name='phoneNo' id='phoneNo' placeholder='Enter phoneNo' style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-2  text-richblack-5'
                        {...register("phoneNo", {
                        required:{value:true,message:'Please enter phone No'},
                        maxLength:{value:10,message:'Invalid Phone No'} ,
                        minLength:{value:10,message:'Invalid Phone No'} })} />
                    {
                        errors.phoneNo && (
                            <span className='text-red-600'>
                                {errors.phoneNo.message}
                                
                            </span>
                        )
                    }
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" cols="30" rows="7" placeholder='Enter your message here' style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-2  text-richblack-5'
                        {...register("message", { required: true })}
                    />
                    {
                        errors.message && (
                            <span className='text-red-600'>
                               Please enter Message
                            </span>
                        )
                    }

                </div>
                <button type='submit' className='bg-yellow-300 p-2 rounded-[0.5rem] text-black font-bold'>Send Message</button>
            </div>
        </form>
    )
}

export default ContectusForm