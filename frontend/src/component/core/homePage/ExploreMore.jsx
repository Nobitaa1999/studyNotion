import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage_explore';
import HighlightedText from './HighlightedText';
import CourseCard from './CourseCard';

const tabName=["Free","New to coding","Most populer","Skills paths","Career paths"];

const ExploreMore = () => {
  const [currentTab,setCurrentTab]=useState(tabName[0]);
  const [courseData,setCourseData]=useState(HomePageExplore[0].courses);
  const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

  const setMyCard=(value)=>{
    setCurrentTab(value);
    const result=HomePageExplore.filter((courses)=>courses.tag===currentTab);
    setCourseData(result[0]?.courses);
    setCurrentCard(result[0]?.courses[0]?.heading);

  }

// console.log(currentTab);
// console.log(courseData);
  return (
    <div className='flex flex-col items-center gap-3'>

      <div className='text-3xl font-semibold'>
        Unlock the<HighlightedText text=' Power of code' />
      </div>
      <div className='text-richblack-5 text-[16px]'>
        Learn to build anything you can imagine.
      </div>

      <div className='flex flex-row gap-4 mt-5 px-1 py-1 bg-richblack-700 rounded-full'>
        {
          tabName.map((ele,index)=>{
            return (
              <div className={`px-7 py-3 rounded-full cursor-pointer ${currentTab===ele ? 'bg-richblack-900 text-white' : 'text-richblack-5 hover:text-richblack-100'} transition-all duration-500 `} key={index} onClick={()=>setMyCard(ele)}>
                {ele}
              </div>
            )
          })
        }
      </div>

      <div className='lg:h-[170px]'></div>

      <div className='absolute flex flex-row gap-10 items-center justify-center translate-y-[80%]'>

        {
          courseData.map((element,ind)=>{
            return <CourseCard key={ind} data={element} currentTab={currentTab} setCurrentTab={setCurrentTab}  />
          })
        }

      </div>

    </div>
  )
}

export default ExploreMore