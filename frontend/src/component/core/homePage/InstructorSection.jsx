import React from 'react'
import image_1_s3 from '../../../assets/images/homeImage_3.jpg'
import { FaArrowRight } from "react-icons/fa";
import CTAButton from './CTAButton';
import HighlightedText from './HighlightedText';

const InstructorSection = () => {
  return (
    <div className='flex flex-row gap-20 items-center mb-24'>
          <div className='w-[50%]'>
          <img src={image_1_s3} alt="" className='shadow-white' style={{ boxShadow: '-10px -10px' }}/>
          </div>
          <div className=' w-[50%] flex flex-col  gap-5 '>
            <div className='text-2xl font-bold line leading-none'>
            <p>Become an</p>
            <p><HighlightedText text='instructor' /></p>
            </div>
            <p className='text-richblack-100 text-sm leading-4'>instructor from around the world teach millions of student on studyNotion.We provide the tools and skill to teach what you love.</p>
            <div className='mt-10 w-fit'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-3'>
              Start teaching today
            
            <FaArrowRight />
            </div>
              </CTAButton>
            </div>
          </div>

        </div>
  )
}

export default InstructorSection