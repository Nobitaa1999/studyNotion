import React from 'react'
import Logo1 from '../../../assets/logos/leadership_logo.png'
import Logo2 from '../../../assets/logos/responsibility_logo.png'
import Logo3 from '../../../assets/logos/flexibility_logo.png'
import Logo4 from '../../../assets/logos/solution_logo.png'
import timelineImage1 from '../../../assets/images/homeImage_1.jpg'


const timeline=[
    {
        Heading:'Leadership',
        discription:'Fully commited to the success company',
        Logo:Logo1
    },
    {
        Heading:'Responsibility',
        discription:'Student will always be our top priority',
        Logo:Logo2
    },
    {
        Heading:'Flexibility',
        discription:'The ability to switch is an important skill ',
        Logo:Logo3
    },
    {
        Heading:'Solution',
        discription:'Code your way to a solution',
        Logo:Logo4
    },
]
const TimelineSection = () => {
  return (
    <div className='w-10/12 mx-auto flex flex-row justify-between items-center  gap-3 max-w-maxContent'>

        <div className='flex flex-col w-[40%] gap-8'>
            {
             timeline.map((element,index)=>{
                return (
                    <div className='flex flex-row gap-6 items-center' key={index}>
                        <img src={element.Logo} alt="leadership" className='h-[30px] w-[30px]'/>
                        <div>
                            <p className='text-1xl font-medium' >{element.Heading}</p>
                            <p>{element.discription}</p>
                        </div>
                    </div>
                )
             })
            }
        </div>
        <div className='relative w-[50%]'>
            <img src={timelineImage1} alt="image" className='h-fit object-cover shadow-white'/>
             <div className='absolute flex flex-row py-6 px-4 uppercase bg-green-950 text-white left-[40%] -translate-x-20 -translate-y-10'>
                <div className='flex gap-3 items-center px-3 border-r'>
                    <p className='text-white text-2xl font-bold'>10</p>
                    <p className='text-xs text-green-200'>Years of experience</p>
                </div>
                <div className='flex gap-3 items-center px-3'>
                    <p className='text-white text-2xl font-bold'>150+</p>
                    <p className='text-xs text-green-200'>type of course</p>
                </div>
             </div>      
        </div>

    </div>
  )
}

export default TimelineSection