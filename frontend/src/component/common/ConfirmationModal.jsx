import React from 'react'
import Iconbtn from './Iconbtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
        <div className='bg-richblack-500 text-richblack-50 p-6 rounded-lg shadow-lg w-1/4 max-w-sm'>
            <p className='text-white text-xl font-light'>{modalData.text1}</p>
            <p >{modalData.text2}</p>
            <div className='flex gap-6 mt-6'>
                <Iconbtn 
                onclick={modalData?.btn1Handler}
                text={modalData?.btn1text}
                />
                <button onClick={modalData.btn2Handler} className='bg-white text-black py-1 px-2 rounded-[0.5rem]'>{modalData.btn2text}</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal