import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightedText from '../component/core/homePage/HighlightedText';
import CTAButton from '../component/core/homePage/CTAButton';
import CodeCardBox from '../component/core/homePage/CodeCardBox';
import Robot from '../assets/videos/robo_world.mp4'
import TimelineSection from '../component/core/homePage/TimelineSection';
import LearningLanguageSection from '../component/core/homePage/LearningLanguageSection';
import InstructorSection from '../component/core/homePage/InstructorSection';
import ExploreMore from '../component/core/homePage/ExploreMore';
import Footer from '../component/common/Footer';
import ReviewSlider from '../component/common/ReviewSlider';



const Home = () => {
  return (
    <div className='relative mx-auto flex flex-col  max-w-maxContent items-center text-white'>
      {/* section_1 */}
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center'>
        <Link to={"/signup"}>
          <div className='group mx-auto rounded-full bg-richblack-500 justify-center items-center mt-16 p-1 font-bold text-richblack-50 transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex items-center gap-2 px-3 py-[5px] rounded-full group-hover:bg-richblack-800'>
              <p className=''>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className='text-center text-3xl mt-6 font-semibold'>
          Empower Your Future with  <HighlightedText text='Coding Skill' />
        </div>

        <div className='w-[75%] text-center text-lg mt-3 text-richblack-50'>
          With our online coding course, you can learn at your own place, from anywhere in the world, and get the access to a wealth of resource, including hands-on-project, quzzies and personalized feedback from instructor.
        </div>

        <div className='flex gap-9  mt-7'>
          <CTAButton active={true} linkto={"/signup"}>Learn more</CTAButton>
          <CTAButton active={false} linkto={"/login"}>Book a demo</CTAButton>
        </div>

        <div className='mx-3 my-12 w-10/12 shadow-blue-200 ' style={{ boxShadow: '10px 10px' }}>
          <video muted autoPlay loop style={{ aspectRatio: '2/1', width: '100%', objectFit: 'cover' }}>
            <source src={Robot} type="video/mp4" />
          </video>
        </div>

        <div className='w-10/12 gap-8'>
          <CodeCardBox
            position={'lg:flex-row'}
            heading={<div className='text-3xl font-semibold'>Unlock your <HighlightedText text='coding potential' /> with our online class</div>}
            subheading={'Our classes designed and taught by industry level experts who have years of experiance in coding and are passionate about sharing their knowledge with you.'}
            ctabtn1={
              {
                btnText: 'Try it yourself',
                active: true,
                linkto: '/signup'
              }
            }
            ctabtn2={
              {
                btnText: 'Learn more',
                active: false,
                linkto: '/login'
              }
            }
            codecontent={`<!DOCTYPE html>\n <html>\n<head><title>Example</title>\n<title>link ref='style sheet' href='style.css'</title>\n</head>\n<body>\n<h1 <a>href='/'>Heading</a>\n</h1>`}
          />

          <CodeCardBox
            position={'lg:flex-row-reverse'}
            heading={<div className='text-3xl font-semibold'>Unlock your <HighlightedText text='coding potential' /> with our online class</div>}
            subheading={'Our classes designed and taught by industry level experts who have years of experiance in thier relative field'}
            ctabtn1={
              {
                btnText: 'Try it yourself',
                active: true,
                linkto: '/signup'
              }
            }
            ctabtn2={
              {
                btnText: 'Learn more',
                active: false,
                linkto: '/login'
              }
            }
            codecontent={`<!DOCTYPE html>\n <html>\n<head><title>Example</title>\n<title>link ref='style sheet' href='style.css'</title>\n</head>\n<body>\n<h1 <a>href='/'>Heading</a>\n</h1>`}
          />
        </div>

        <ExploreMore/>
      </div>
      {/* section_2 */}
      <div className=' w-[100%] bg-white text-richblack-700'>
        <div className='h-[200px]'></div>
        <div className='flex items-center justify-center my-10'>

          <div className='flex flex-row gap-8 text-white justify-center items-center'>
            <CTAButton active={true} linkto={'/signup'} >
              <div className='flex flex-row items-center'>
                Explore full catalog
                <FaArrowRight />
              </div>
            </CTAButton>
            <CTAButton active={false} linkto={'/login'}>Learn more</CTAButton>
          </div>
        </div>

        <div className='w-11/12 max-w-maxContent flex flex-col mx-auto items-center justify-between gap-7'>


          <div className='flex flex-row gap-5 justify-between mb-10 mt-[20px] '>
            <div className='text-3xl font-semibold w-[40%]'>Get the skill you need for a <HighlightedText text={`job that is in demand`} />
            </div>
            <div className='flex flex-col gap-9 w-[45%] items-start'>
              <p>The mordern studynotion dictated its own terms.Today to be a competitive specialist requires more then a professional skill.</p>
              <CTAButton active={true} linkto={"/signup"}>Learn more</CTAButton>
            </div>
          </div>
        </div>

        <TimelineSection />
        <LearningLanguageSection/>

      </div>

      {/* section_3 */}

      <div className='w-11/12 flex flex-col items-center justify-between gap-2 mx-auto mt-16'>

        <InstructorSection/>
        
      <h2 className='text-2xl font-medium'>Review from other learner</h2>

      <ReviewSlider/>


      </div>


      {/* footer */}
      <Footer/>
    </div>
  )
}

export default Home
