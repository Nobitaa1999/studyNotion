import React from 'react'
import ContectusForm from '../component/core/homePage/ContectusForm'
import { IoIosChatboxes } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { LuPhoneCall } from "react-icons/lu";
import Footer from '../component/common/Footer';

const ContactUs = () => {
    return (
        <div>
        <div className='text-white w-[50%] flex gap-10 items-start  mx-auto mt-8'>
            <div className='bg-richblack-700 p-3 rounded-[0.5rem] w-2/5 flex flex-col  items-start justify-between gap-6'>
                <div className='flex flex-col '>
                    <div className='flex items-center gap-2'>
                        <IoIosChatboxes />
                        <p className='text-lg font-bold'>Chat on us</p>
                    </div>
                    <p className='text-xs text-richblack-5 leading-tight'>Our friendly team have to help.</p>
                    <p className='text-xs text-richblack-5'>What'sApp on it : 8932659895 </p>
                </div>
                <div className='flex flex-col leading-tight'>
                    <div className='flex items-center gap-2'>
                    <FaLocationDot />
                        <p className='text-lg font-bold'>Visit us</p>
                    </div>
                    <p className='text-xs text-richblack-5 leading-tight'>Came and ask anything in our HQ.</p>
                    <p className='text-xs text-richblack-5'>Renusager Sonebhadra UP-231218</p>
                </div>
                <div className='flex flex-col leading-tight'>
                    <div className='flex items-center gap-2'>
                    <LuPhoneCall />
                        <p className='text-lg font-bold'>Call us</p>
                    </div>
                    <p className='text-xs text-richblack-5 leading-tight'>Mon-Fri from 8am-5pm</p>
                    <p className='text-xs text-richblack-5'>+1800 0000 2300</p>
                </div>
                
               
            </div>
            <div className='flex flex-col w-3/5 mt-6'>
                <div>
                    <div className='text-2xl font-semibold leading-none'>Got a Idea?We've got the skills.</div>
                    <div className='text-2xl font-semibold leading-none'>Let's team up</div>
                </div>
                <p className='text-xs text-richblack-50 py-2 mb-4'>Tell us about yourself</p>
                <ContectusForm />
            </div>
        </div>
        <div>Review from other </div>
        <Footer/>
        </div>
    )
}

export default ContactUs