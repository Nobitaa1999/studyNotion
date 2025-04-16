import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from 'react-type-animation'

const CodeCardBox = ({ position, heading, subheading, ctabtn1, ctabtn2, codecontent, codegradiant }) => {
  return (
    <div className={` flex ${position} justify-between gap-32 mt-16 mb-32 `}>
      <div className='w-[50%] flex flex-col gap-3 '>
        {heading}
        <div className='text-richblack-50'>{subheading}</div>
        <div className='flex gap-9 mt-12'>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
            <div className='flex items-center gap-3'>
              {ctabtn1.btnText}
            
            <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}

          </CTAButton>
        </div>

      </div>
      <div className='w-[50%] flex flex-row  shadow-2xl shadow-slate-400  bg-neutral-900 rounded' >
       <div className='text-richblack-50 w-[10%] flex flex-col text-center font-bold'>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        
       </div>
       <div className='w-[90%] flex flex-col'>
        <TypeAnimation
        sequence={[codecontent,3000,""]}
        repeat={Infinity}
        omitDeletionAnimation={true}
        style={
          {
            whiteSpace:'pre-line',
            color:'green'
            
          }
        }
        />
       </div>
      </div>
    </div>
  )
}

export default CodeCardBox