import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Iconbtn from '../../common/Iconbtn'
import { FaEdit } from "react-icons/fa";

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    // console.log(user);
    return (
        <div className='text-white w-3/4 mx-auto'>
            <h1 className='text-2xl font-semibold mb-6'>My Profile</h1>

<div className='flex flex-col gap-8'>
    <div className='flex bg-richblack-600 border-[1px] border-richblack-5 rounded-[0.5rem] justify-between items-center  p-7'>
                <div className='flex gap-2 py-2' >
                    <img src={`${user?.image}`} alt={`profile-${user?.firstName}`} className='aspect-square w-[3rem] rounded-full' />
                    <div className='flex flex-col'>
                        <p className='font-semibold'>{user?.firstName + " " + user?.lastName}</p>
                        <p className='text-richblack-50 text-sm '>{user?.email}</p>
                    </div>
                </div>
                <Iconbtn text='Edit'
                    onclick={() => {
                        navigate('/dashboard/setting')
                    }}
                    className="bg-yellow-400 py-1 px-2 text-black font-semibold"
                ><FaEdit /></Iconbtn>
            </div>

            <div className='flex flex-col gap-4 bg-richblack-600 border-[1px] border-richblack-5 rounded-[0.5rem] justify-between items-start  p-7'>
                <div className='flex w-full justify-between items-center'>
                    <p className='font-semibold'>About</p>
                    <Iconbtn text='Edit'
                        onclick={() => {
                            navigate('/dashboard/setting')
                        }}
                    ><FaEdit /></Iconbtn>

                </div>
                <p className='text-richblack-50 text-sm w-1/2'>{user?.additionalDetail?.about ?? " Write about something about yourself"}</p>
            </div>

            <div className='flex flex-col gap-4 bg-richblack-600 border-[1px] border-richblack-5 rounded-[0.5rem] justify-between items-start  p-7'>
                <div className='flex w-full justify-between items-center'>
                    <p className='font-semibold'>Personal Details</p>
                    <Iconbtn text='Edit'
                        onclick={() => {
                            navigate('/dashboard/setting')
                        }}
                    ><FaEdit /></Iconbtn>

                </div>
                <div className='grid grid-cols-2 gap-x-8 gap-y-3 '>
                    <div>
                        <p className='text-richblack-110 text-sm'>First Name</p>
                        <p className='font-medium'>{user?.firstName}</p>
                    </div>

                    <div>
                        <p className='text-richblack-110 text-sm'>Last Name</p>
                        <p className='font-medium'>{user?.lastName}</p>
                    </div>

                    <div>
                        <p className='text-richblack-110 text-sm'>Email</p>
                        <p className='text-richblack-50 text-base'>{user?.email}</p>
                    </div>

                    <div>
                        <p className='text-richblack-110 text-sm'>Phone No.</p>
                        <p className='text-richblack-50 text-base'>{user?.additionalDetail?.contactNumber ?? "Add Contact Number"}</p>
                    </div>

                    <div>
                        <p className='text-richblack-110 text-sm'>Gender</p>
                        <p className='text-richblack-50 text-base'>{user?.additionalDetail?.gender ?? "Add Gender"}</p>
                    </div>

                    <div>
                        <p className='text-richblack-110 text-sm'>Date of Birth</p>
                        <p className='text-richblack-50 text-base'>{user?.additionalDetail?.dateOfBirth ?? "Add DOB"}</p>
                    </div> 
                </div>
            </div></div>
            

        </div>
    )
}

export default MyProfile