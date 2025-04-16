import React from 'react'
import HighlightedText from './HighlightedText'
import image2 from '../../../assets/images/homeImage_2.jpg'
import image3 from '../../../assets/images/homeImage_3.jpg'
import image4 from '../../../assets/images/homeImage_4.jpg'
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[150px]'>
    <div className='w-11/12 flex flex-col mx-auto gap-4 items-center justify-between'>

      <div className='text-3xl font-semibold'>
        Your swiss knife for <HighlightedText text='Learning any language' ></HighlightedText>
      </div>
      {/* <div className='h-[100px]'> </div> */}
      <div className='text-center mx-auto w-[65%]'>
        Using spin making learning multiple language easy.With 20+ languages realastic voice-over, progress-tracking, custom schedule and more. 
      </div>

      <div className='flex flex-row items-center justify-center mt-16 gap-3 mb-32 '>
      <img src={image2} alt="" className='object-cover w-60 h-60 aspect-square rotate-12 shadow-lg shadow-slate-400'/>
      <img src={image3} alt="" className='object-cover w-60 h-60 aspect-square -rotate-12 translate-y-4 shadow-lg shadow-slate-400'/>
      <img src={image4} alt="" className='object-cover w-60 h-60 aspect-square rotate-12 shadow-lg shadow-slate-400' />
      </div>
       
       <div className='mb-12'>
      <CTAButton active={true} linkto={"/signup"}  >Learn more</CTAButton>
      </div>

    </div>
    </div>
  )
}

export default LearningLanguageSection