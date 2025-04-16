import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../slices/profileSlice';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiUpload } from "react-icons/fi"
import Iconbtn from '../../common/Iconbtn'
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { PiUploadSimpleBold } from "react-icons/pi";
import { changePassword, updateProfile, updateProfilePicture } from '../../../services/operation/Setting';
import { deleteAccount } from '../../../services/operation/Setting';

const Setting = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Image upload

  const [loadingImage, setLoadingImage] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log("file",file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    console.log("reader",reader);
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
      console.log("previewSource",previewSource);
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoadingImage(true)
      const formDataImage = new FormData()
      
      formDataImage.append("displayPicture", imageFile)
      console.log("formDataImage",formDataImage);
      dispatch(updateProfilePicture(token, formDataImage)).then(() => {
        setLoadingImage(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])


  // ***********Additional details******************

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    contactNumber: user?.additionalDetail?.contactNumber,
    about: user?.additionalDetail?.about,
    dateOfBirth: user?.additionalDetail?.dateOfBirth,
    gender: user?.additionalDetail?.gender || "Male"
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   
  const submitHandleProfile = async (e) => {
    e.preventDefault();

    try {
      const { gender, dateOfBirth, contactNumber, about } = formData;
      dispatch(setUser({ ...user, additionalDetail: formData }))
    localStorage.setItem("user", JSON.stringify(formData));
      dispatch(
        updateProfile(gender, dateOfBirth, contactNumber, about, token, navigate)
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  


  // ***********Password update******************

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: '',
    newPassword: ''
  });
  const [formDataPassword, setFormDataPassword] = useState({
    password: '',
    newPassword: ''
  });

  const handleChangePassword = (e) => {
    setFormDataPassword({ ...formDataPassword, [e.target.name]: e.target.value });
  };
  const submitHandlePassword = (e) => {
    e.preventDefault();
    let validatePasswordForm = {
      password: formDataPassword.password ? "" : "Current Password is required.",
      newPassword: formDataPassword.newPassword ? "" : "New Password is required.",
    }
    setErrors(validatePasswordForm);
    if (!validatePasswordForm.password && !validatePasswordForm.newPassword) {
      try {
        const { password, newPassword } = formDataPassword;
        const conformNewPassword = newPassword;
        const email = user?.email;
        dispatch(changePassword(email, password, newPassword, conformNewPassword, token, navigate))
      } catch (error) {
        console.error("Error changing password:", error.message)
      }
    } else {
      console.log("Somthing in input");
    }
  }


  // ***********Delete account******************


  const deleteHandle=()=>{
    try {
      dispatch(deleteAccount(token,navigate));
    } catch (error) {
      console.log("error occur in delete",error);
    }
  }

  return (
    <div className='text-white w-3/4 mx-auto'>
      <h1 className='text-2xl font-semibold mb-6'>Edit Profile</h1>

      <div className='flex flex-col gap-8'>


        <div className='flex bg-richblack-600 border-[1px] border-richblack-5 rounded-[0.5rem] justify-between items-center  p-7'>
          <div className='flex items-center gap-2 p-2' >
            <img src={previewSource || user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[3rem] h-[3rem] rounded-full object-cover' />
            <div className='flex flex-col gap-2'>
              <p className='text-lg font-semibold text-richblack-5'>Change Profile Picture</p>

              <div className='flex gap-2'>
                <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                accept='image/png,image/jpeg,image/jpg'
                />
                <button
                onClick={handleClick}
                disabled={loadingImage}
                className='cursor-pointer rounded-md bg-richblack-500 text-white py-1 px-2'
                >Select</button>
                <Iconbtn text={loadingImage?"Uploading...":"Upload"}
                  onclick={handleFileUpload}
                  className="bg-yellow-400 py-1 px-2 text-black font-semibold"
                >
                  {!loadingImage &&(<PiUploadSimpleBold />)
}</Iconbtn>
              </div>

            </div>
          </div>

        </div>



        

          <form  onSubmit={submitHandleProfile}>
            <div className="flex flex-col gap-y-4  bg-richblack-600 border-[1px] border-richblack-5 rounded-[0.5rem]  p-8 px-12">
            <p className='text-lg font-semibold text-richblack-5'>Profile Information</p>
            <div className='grid grid-cols-2 gap-x-8 gap-y-3'>
              <div>
                <label htmlFor="firstName" className='text-sm'>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full bg-richblack-500 rounded-[0.5rem] border-b-[1px] border-b-slate-400 py-1 px-2' onChange={handleChange}  />
              </div>

              <div>
                <label htmlFor="lastName" className='text-sm'>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full bg-richblack-500 rounded-[0.5rem] border-b-[1px] border-b-slate-400 py-1 px-2' onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className='text-sm'>Date of Birth</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full bg-richblack-500 rounded-[0.5rem] border-b-[1px] border-b-slate-400 py-1 px-2' onChange={handleChange} placeholder={`${user?.additionalDetail?.dateOfBirth ?? 'dd/mm/yyyy'}`} />
              </div>

              <div>
                <label htmlFor="gender" className='text-sm'>Gender</label>
                <select name="gender" id="gender" style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full bg-richblack-500 rounded-[0.5rem] border-b-[1px] border-b-slate-400 py-1 px-2'
                value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

              </div>

              <div>
                <label htmlFor="contactNumber" className='text-sm'>Contact</label>
                <input type="number" name="contactNumber" value={formData.contactNumber} style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full bg-richblack-500 rounded-[0.5rem] border-b-[1px] border-b-slate-400 py-1 px-2' onChange={handleChange} placeholder={`${user?.additionalDetail?.contactNumber ?? 'Enter mobile no'}`} />
              </div>


              <div>
                <label htmlFor="about" className='text-sm'>About</label>
                <input type="text" name="about" value={formData.about} style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full bg-richblack-500 rounded-[0.5rem] border-b-[1px] border-b-slate-400 py-1 px-2' onChange={handleChange}
                  placeholder={`${user?.additionalDetail?.about ?? 'add your bio'}`} />
              </div>
            </div>

            </div>
          <div className='flex mt-8 justify-end gap-3'>
            <button className='bg-richblack-500 text-white px-4 py-2 rounded-[0.5rem]' onClick={() => {
              navigate('/dashboard/my-profile')
            }}>Cancel</button>
            <button type="submit" className='rounded-[0.5rem] bg-yellow-300 py-2 px-4 font-medium text-richblack-500'>Save</button>
          </div>
          </form>
        



        <form onSubmit={submitHandlePassword}>
          <div className=" flex flex-col gap-y-4  bg-richblack-600 border-[1px] border-richblack-5 rounded-[0.5rem]  p-8 px-12">
            <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="relative flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="password" className="lable-style">
                  Current Password
                </label>
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter Current Password"
                  style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full bg-richblack-500 rounded-[0.5rem] border-b-[1px] border-b-slate-400 py-1 px-2'
                  value={formDataPassword.password}
                  onChange={handleChangePassword}
                />
                <span
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showOldPassword ? (
                    <FaEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <FaEyeSlash fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
                {errors.password && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="newPassword" className="lable-style">
                  New Password
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter New Password"
                  style={{ boxShadow: "inset 0px -1px 0px rgbs(255,255,255,0.18)" }} className='w-full bg-richblack-500 rounded-[0.5rem] border-b-[1px] border-b-slate-400 py-1 px-2'
                  value={formDataPassword.newPassword}
                  onChange={handleChangePassword}
                />
                <span
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showNewPassword ? (
                    <FaEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <FaEyeSlash fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
                {errors.newPassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.newPassword}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-8">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile")
              }}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
            <Iconbtn type="submit" text="Update" />
          </div>
        </form>

        <div className='flex bg-pink-900 opacity-70 px-8 py-5 rounded-[0.5rem] gap-2'>
        <RiDeleteBin4Line className='text-5xl text-red-900 p-2 rounded-full bg-red-400 opacity-80'/>
        <div>
          <p className='text-white font-medium'>Delete Account</p>
          <p>Really do you want to delete your account</p>
          <p>Once you delete your account you will permanently loose your data.</p>
          <p className='cursor-pointer text-pink-300 underline italic' onClick={deleteHandle}>I want to delete my account</p>
        </div>
        </div>

      </div>


    </div>
  )
}

export default Setting

