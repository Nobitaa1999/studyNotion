import React,{useState} from 'react'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import {  useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { login } from '../../../services/operation/authApi';


const LoginForm = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const[formData,setFormData]=useState({
        email:"",password:""
    })
    const [showPassword,setShowPassword]=useState(false);
    const{email,password}=formData;

    const handleOnChange=(e)=>{
        setFormData((preData)=>({
            ...preData,
            [e.target.name]:e.target.value
        }))
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(email,password,navigate));
    }


  return (
    <form onSubmit={handleOnSubmit} className='mt-6 flex flex-col w-full gap-4'>

        <label className='w-full '>
            <p className='mb-1 text-[0.8rem]  text-white'>
                Email Address<sup className='text-pink-700' >*</sup>
            </p>
            <input
            required type="text" name="email" value={email} onChange={handleOnChange} placeholder='Enter email address' style={{boxShadow:"inset 0px -1px 0px rgbs(255,255,255,0.18)"}} className='w-full rounded-[0.5rem] bg-richblack-500 p-[12px] pr-12 text-richblack-5'
            />
        </label>
        <label className='relative'>
            <p className='mb-1 text-[0.8rem] leading-[1.25rem] text-white'>
                Password<sup className='text-pink-700' >*</sup>
            </p>
            <input
            required type={showPassword?"text":"password"}
             name="password" value={password} onChange={handleOnChange} placeholder='Enter password' style={{boxShadow:"inset 0px -1px 0px rgbs(255,255,255,0.18)"}} className='w-full rounded-[0.5rem] bg-richblack-500 p-[12px] pr-12 text-richblack-5'
            />
            <span className='absolute right-3 top-8  z-10 text-[1.5rem] cursor-pointer' onClick={()=>setShowPassword((pre)=>!pre)}>
                {
                    showPassword?(
                        <FaEye fill="#AFBBBF"/>
                    ):(
                        <FaEyeSlash fill="#AFBBBF"/>
                    )
                }

            </span>
            <Link to="/forgot-password">
                <p className='mt-1 ml-auto max-w-max text-xs text-blue-200'>
                    forgot password
                </p>
            </Link> 
        </label>
        <button
            type="submit"
            className='mt-6 rounded bg-yellow-300 py-2 px-4 font-medium text-richblack-500'
        >
            Sign in
        </button>


    </form>
  )
}

export default LoginForm