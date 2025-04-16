import React from 'react'
import { UseSelector, useSelector } from 'react-redux'
import frameImg from '../../../assets/images/frameImg.jpg'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Tamplate = ({title,description1,description2,image,formType}) => {
    const {loading}=useSelector((state)=>state.auth)
    return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {loading ? (
            <div className='spinner'> loading</div>
        ):(
            <div className='mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-evenly gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12'>
                <div className='mx-auto w-11/12 max-w-[450px] md:mx-0'>
                    <h1 className='text-[1.87rem] font-semibold leading-tight text-white'>
                        {title}
                    </h1>
                    <p className='mt-4 text-[1.125rem] leading-tight'>
                        <span className='text-richblack-5'>{`${description1} `}</span>
                        <span className='font-edu-sa font-bold italic text-blue-300'>
                            {description2}
                        </span>
                    </p>
                    {formType==="login" ?<LoginForm/>: <SignupForm/>}
                </div>
                <div className='relative mx-auto w-11/12 max-w-[450px] md:mx-0'>
                    <img src={frameImg}
                    alt='Pattern'
                    
                    loading='lazy'
                    className='object-cover w-[80%] aspect-square'
                    />
                    <img src={image}
                    alt='Student'
                    
                    loading='lazy'
                    className='absolute top-3 left-3 z-10 w-[80%] aspect-square object-cover'
                    />
                </div>

            </div>
        )}        
    </div>
  )
}

export default Tamplate