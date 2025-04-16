import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operation/authApi';

const ForgotPassword = () => {
    const[emailSent,setEmailSent]=useState(false);
    const {loading}=useSelector((state)=>state.auth);
    const[email,setEmail]=useState('');
    const dispatch=useDispatch();

    const changeOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }

  return (
    <div className='flex items-center justify-center h-[80vh]'>
        {
            loading ? ( 
            <div className=''>Loading...</div>
            ) : (
                <div className='flex flex-col items-start w-[25%] gap-3 text-white '>
                    <h1 className='text-2xl font-semibold'>
                        {
                            !emailSent ? "Reset Your Passowrd" : "Check Your Email"
                        }
                    </h1>
                    <p className='text-richblack-100 leading-none '>
                        {
                            !emailSent ? "Have no fear. We'll email you instructions to reset your password":`We have sent the reset email to ${email}`
                        }
                    </p>
                    <form onSubmit={changeOnSubmit} className='w-full'>
                        {
                            !emailSent && (
                                <lable>
                                    <p className='text-[1rem] text-richblack-5 leading-[2.25rem]'>Email Address<sup className='text-pink-500'>*</sup></p>
                                    <input required type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email' style={{boxShadow:"inset 0px -1px 0px rgbs(255,255,255,0.18)"}} className='w-full rounded-[0.5rem] bg-richblack-500 p-1 pr-12 text-richblack-5'/>
                                </lable>
                            )
                        }
                        <button type="submit" className='bg-yellow-500 text-richblack-700 font-semibold my-3 w-full rounded py-1'>
                            {
                                !emailSent ? ("Reset password") : ("Resend email")
                            }
                        </button>
                    </form>
                    <div>
                        <Link to="/login" className="flex gap-x-2 items-center">
                        <FaArrowLeft />
                            Back to login
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword