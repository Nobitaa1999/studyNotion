import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation,Link,useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { resetPassword } from '../services/operation/authApi';
import { FaArrowLeft } from "react-icons/fa";


const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    conformPassword: ""
  })
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);
  const dispatch = useDispatch();
  const { password, conformPassword } = formData; 
  const location = useLocation();
  const navigate=useNavigate();


  const handleOnChange = (e) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    const token = location.pathname.split('/').at(-1);
    console.log("hello",token);
    dispatch(resetPassword(password, conformPassword, token,navigate))
  }
  return (
    <div className='flex items-center justify-center h-[80vh]'>

      {
        loading ?
          (<div>loading</div>)
          :
          (<div className='flex flex-col items-start mx-auto text-white'>
            <h1 className='text-white text-2xl font-semibold'>Choose new password</h1>
            <p className='text-richblack-5'>Almost done.Enter your new password and you are all set.</p>
            <form onSubmit={handleOnSubmit} className='my-3'>
              <lable className='relative'>
                <p className='text-sm text-richblack-5 leading-tight'>New Password<sup className='text-pink-500'>*</sup></p>
                <input required
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={password}
                  onChange={handleOnChange}
                  placeholder='enter your password'
                  style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-1 pr-12 text-richblack-5' />
                <span className='absolute right-3  z-10 text-[1.5rem] cursor-pointer ' onClick={() => setShowPassword((pre) => !pre)}>
                  {
                    showPassword ? (
                      <FaEye fill="#AFBBBF" />
                    ) : (
                      <FaEyeSlash fill="#AFBBBF" />
                    )
                  }

                </span>
              </lable>
              <lable className='relative'>
                <p className='text-[1rem] text-richblack-5 leading-tight mt-2'>conform New Password<sup className='text-pink-500'>*</sup></p>
                <input required
                  type={showConformPassword ? "text" : "password"}
                  name='conformPassword'
                  value={conformPassword}
                  onChange={handleOnChange}
                  placeholder='conform your password'
                  style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full rounded-[0.5rem] bg-richblack-500 p-1 pr-12 text-richblack-5' />
                <span className='absolute right-3   z-10 text-[1.5rem] cursor-pointer' onClick={() => setShowConformPassword((pre) => !pre)}>
                  {
                    showConformPassword ? (
                      <FaEye fill="#AFBBBF" />
                    ) : (
                      <FaEyeSlash fill="#AFBBBF" />
                    )
                  }

                </span>
              </lable>
              <button
                type="submit"
                className='mt-6 rounded bg-yellow-300 py-2 px-4 font-medium text-richblack-500'
              >
                Reset Password
              </button>
            </form>
            <div className='mt-8'>
              <Link to="/login" className="flex gap-x-2 items-center">
                <FaArrowLeft />
                Back to login
              </Link> 
            </div>

          </div>)
      }

    </div>
  )
}

export default UpdatePassword