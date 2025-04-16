import React from 'react'

const CourseCard = ({data,currentTab,setCurrentTab}) => {
  return (
    <div className='bg-richblack-850 flex flex-col  justify-between p-2 pt-4 w-[22%] aspect-square'>
        <div>
        <div className='text-1xl font-bold'>
            {data.heading}
        </div>
        <p className=' text-richblack-50 '>
            {data.description}
            </p>
            </div>
            
        <div className='flex flex-row justify-between text-richblack-50 border-t py-3'>
            <p>{data.level}</p>
            <p>{`${data.lessionNumber} Lessons`}</p>
        </div>
    </div>
  )
}

export default CourseCard