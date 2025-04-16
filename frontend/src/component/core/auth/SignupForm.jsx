import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operation/authApi';

const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConformPassword, setShowConformPassword] = useState(false);

    const [formData, setFormData] = useState({
        accountType: 'Student',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        conformPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, conformPassword } = formData;

        if (password !== conformPassword) {
            alert('Passwords do not match');
            return;
        }

        dispatch(setSignupData(formData));
        await dispatch(sendOtp(email, navigate));
        navigate('/verify-email');
    };


    return (
        <div className="text-white">

            {loading ? (
                <div>Loading...</div>
            ) : (

                <form onSubmit={handleSubmit} className='mt-6 flex flex-col w-full gap-2'>
                    <div className='w-fit flex gap-3 rounded-full  cursor-pointer p-[1px] bg-richblack-500'>
                        <div className={`text-lg py-2 px-4 rounded-full ${formData.accountType === 'Instructor' ? 'bg-richblack-800 text-white' : 'bg-richblack-500 text-richblack-5'} transition-all duration-100 `} onClick={() => { setFormData({ ...formData, accountType: 'Instructor' }) }} >Instructor</div>
                        <div className={`text-lg py-2 px-4 rounded-full ${formData.accountType === 'Student' ? 'bg-richblack-800 text-white' : 'bg-richblack-500 text-richblack-5'} transition-all duration-100 `} onClick={() => { setFormData({ ...formData, accountType: 'Student' }) }}>Student</div>
                    </div>
                    <div className='flex gap-3'>
                        <label className='w-full '>
                            <p className='mb-1 text-[0.8rem]  text-white'>
                                First name<sup className='text-pink-700' >*</sup>
                            </p>
                            <input
                                required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First Name' style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-[4px] pl-2 text-richblack-5'
                            />
                        </label>
                        <label className='w-full '>
                            <p className='mb-1 text-[0.8rem]  text-white'>
                                Last name<sup className='text-pink-700' >*</sup>
                            </p>
                            <input
                                required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last Name' style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-[4px] pl-2 text-richblack-5'
                            />
                        </label>
                    </div>
                    <label className='w-full '>
                        <p className='mb-1 text-[0.8rem]  text-white'>
                            Email<sup className='text-pink-700' >*</sup>
                        </p>
                        <input
                            required type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Email address' style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-[4px] pl-2 text-richblack-5'
                        />
                    </label>
                    <div className='flex gap-4'>
                        <label className='relative w-full'>
                            <p className='mb-1 text-[0.8rem] leading-[1.25rem] text-white'>
                                Password<sup className='text-pink-700' >*</sup>
                            </p>
                            <input
                                required type={showPassword ? "text" : "password"}
                                name="password" value={formData.password} onChange={handleChange} placeholder='Enter password' style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-[4px] pl-2 text-richblack-5'
                            />
                            <span className='absolute right-3 top-7  z-10 text-[1.5rem] cursor-pointer' onClick={() => setShowPassword((pre) => !pre)}>
                                {
                                    showPassword ? (
                                        <FaEye fill="#AFBBBF" />
                                    ) : (
                                        <FaEyeSlash fill="#AFBBBF" />
                                    )
                                }

                            </span>

                        </label>
                        <label className='relative w-full'>
                            <p className='mb-1 text-[0.8rem]  text-white'>
                                Conform Password<sup className='text-pink-700' >*</sup>
                            </p>
                            <input
                                required type={showConformPassword ? "text" : "password"} name="conformPassword" value={formData.conformPassword} onChange={handleChange} placeholder='conformPassword' style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-[4px] pl-2 text-richblack-5'
                            />
                            <span className='absolute right-3 top-7  z-10 text-[1.5rem] cursor-pointer' onClick={() => setShowConformPassword((pre) => !pre)}>
                                {
                                    showConformPassword ? (
                                        <FaEye fill="#AFBBBF" />
                                    ) : (
                                        <FaEyeSlash fill="#AFBBBF" />
                                    )
                                }

                            </span>
                        </label>
                    </div>

                    <button type="submit" className='mt-6 rounded bg-yellow-300 py-2 px-4 font-medium text-richblack-500'>Create Account</button>
                </form>
            )}
        </div>
    );
};

export default SignupPage;
