import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input'
import { signup, sendOtp } from '../services/operation/authApi'
import { useNavigate, Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-hot-toast'


const VerifyEmail = () => {
    const { loading, signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!signupData) {
            navigate('/signup')
        }
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            conformPassword
        } = signupData;
        if(otp.length===6){
        dispatch(signup(accountType, firstName, lastName, email, password, conformPassword, otp, navigate))
        }else{
            toast.error('Please enter complete otp')
        }
    }
   
    return (
        <div className='text-white min-h-[calc(100vh-3.5rem)] flex items-center justify-center'>
            {
                loading
                    ? (<div>Loading...</div>)
                    : (
                        <div className=' w-[22%] flex flex-col gap-1 items-start justify-center '>
                            <h1 className='text-2xl font-semibold  leading-tight '>Verify Email</h1>
                            <p className='text-richblack-50 leading-none'>A verification cade has been sent to <span className='text-blue-400'>{signupData.email}</span> </p>
                            <form onSubmit={handleOnSubmit} className='w-full'>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span className="mx-2"></span>}
                                    renderInput={(props) => <input {...props}
                                        type="text"
                                        className="bg-richblack-700 border-yellow-200 p-2 rounded-md w-8  text-white text-center" style={{ border:"5x solid yellow" }} />}
                                />
                                <button type="submit" className='w-full bg-yellow-300 text-richblack-800 rounded-md my-3' >Verify Email</button>
                            </form>

                            <div className='w-full flex justify-between items-center'>
                                <div className=''>
                                    <Link to="/login" className="flex gap-x-2 items-center">
                                        <FaArrowLeft />
                                        Back to login
                                    </Link>
                                </div>
                                <button className='text-blue-400' onClick={() => dispatch(sendOtp(signupData.email,navigate))}>Resend it</button>
                            </div>


                        </div>
                    )
            }
        </div>
    )
}

export default VerifyEmail