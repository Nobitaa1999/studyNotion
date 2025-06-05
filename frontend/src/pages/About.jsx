import React from 'react'
import HighlightedText from '../component/core/homePage/HighlightedText'
import Picture001 from '../assets/images/aboutImage001.jpeg'
import Picture002 from '../assets/images/aboutImage002.jpeg'
import Picture003 from '../assets/images/aboutImage003.jpg'
import {LearningGrid} from '../data/aboutLearningGrid.js'
import CTAButton from '../component/core/homePage/CTAButton'
import About_Form from '../component/core/homePage/About_Form'
import Footer from '../component/common/Footer'
import ReviewSlider from '../component/common/ReviewSlider';
const About = () => {
  return (
    <div className='text-white flex flex-col mx-auto items-center '>


      <section className=' bg-richblack-700 mx-auto'>
        <div className='w-11/12 flex flex-col items-center justify-between mt-8 relative'>
          <div className=' w-[60%] text-center text-3xl font-semibold'>
            <h1>Driving Innovation in online education for a</h1>
            <HighlightedText text='Brighter Future' />
          </div>
          <p className='w-[60%] text-center mt-4 pb-[170px] text-richblack-5'>StudyNotion is at the forefront at driving innovation in online education, We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

          <div className='flex gap-6 absolute mx-auto -bottom-6 translate-y-[35%]'>
            <img src={Picture001} className='object-cover max-h-60 aspect-square ' alt="" />
            <img src={Picture002} className='object-cover max-h-60 aspect-square' alt="" />
            <img src={Picture003} className='object-cover max-h-60 aspect-square ' alt="" />
          </div>
        </div>

      </section>


      <section className='mt-32  text-center w-full flex items-center justify-center' >
        <div className='w-[75%]  text-3xl font-semibold'>
        We are passionate about revolutionizing the way learn. Our innovation platform <span className='text-orange-400'>combines technology</span>,  <HighlightedText text='expertise'/>, and community to create an <span className='text-orange-400'>unparalleled educational experience.</span>
        </div>
      </section>

      <section className=' text-richblack-50  mt-36 w-[75%] flex flex-col items-center justify-between gap-16'>
        <div className='flex justify-between items-center gap-24'>
          <div className='flex flex-col items-start justify-center gap-3'>
            <h2 className='text-red-500 text-3xl font-semibold'>Our Founding Story</h2>
            <p className='text-sm leading-tight font-medium'>Our e-learnig platform was born out of a shared vision and passion for transforming education. It all bagan with a group of educators, technologists, and lifelong learners with recognized the need for accessible, flexible and high-quality learning opportunities in a rapidly evolving digital world. </p>
            <p className='text-sm leading-tight font-medium'>As experienced educators ourselves, we withnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of classroom or restricted by geofraphical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential. </p>
          </div>
          <img src={Picture002} className='max-h-48' alt="" />
        </div>
        <div className='flex justify-between items-center gap-24 my-16'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-orange-400 text-3xl font-semibold'>Our Vision</h2>
            <p className='text-sm leading-tight font-medium'>With this vision in mind, We set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked to develop a robust and intutive platform that combines cutting-edges technology with engaging content, fostering a dynamic and interctive learning experience. </p>
            
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className='text-blue-400 text-3xl font-semibold'>Our Mission</h2>
            <p className='text-sm leading-tight font-medium'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions and networking opportunities.</p>
          </div>
        </div>
      </section>

      <section className='bg-richblack-500 w-full items-center'>
        <div className='w-[70%] flex items-center justify-around mx-auto py-8'>
          <div className='flex flex-col items-center'>
            <span className='text-white text-xl font-bold'>5K</span>
            <span className='text-sm text-richblack-5'>Active Students</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-white text-xl font-bold'>10+</span>
            <span className='text-sm text-richblack-5'>Mentors</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-white text-xl font-bold'>20+</span>
            <span className='text-sm text-richblack-5'>Courses</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-white text-xl font-bold'>5+</span>
            <span className='text-sm text-richblack-5'>Awards</span>
          </div>
          
        </div>

      </section>

      <section className='w-[70%] grid mx-auto grid-cols-1 lg:grid-cols-4 my-16 items-stretch'>
        {
          LearningGrid.map((card,index)=>{
            return (
              <div key={index}
              className={`${index===0 && 'bg-transparent lg:col-span-2'} ${card.order%2===0 ?"bg-richblack-500":"bg-richblack-700"} ${card.order===3 && 'lg:col-start-2'} flex flex-col h-full min-h-[220px]`}>
                {
                  card.order<0 ?
                  (<div className='flex flex-col gap-3 items-start pb-4'>
                  <div className='text-3xl font-semibold '>
                  <p className='leading-none'>{card.heading}</p>
                  <HighlightedText className='leading-none' text={card.highlighted}/>
                  </div>
                  
                  <p className='text-richblack-100'>{card.description}</p>
                  <CTAButton active={true} linkto={card.BtnLink}>{card.BtnText}</CTAButton>
                  </div>
                  )
                  :
                  (<div className='flex flex-col gap-3 p-5'>
                  <p className='text-lg font-bold'>{card.heading}</p>
                  <p className='text-richblack-100 text-sm leading-tight'>{card.description}</p>
                  </div>
                  )
                }                
              </div>
            )
          })
        }        
      </section>

      <About_Form/>

      <section>
        <div className='text-3xl text-white font-medium text-center'>Review from other lerner</div>
      </section>
      <ReviewSlider/>
      <Footer/>

    </div>
  )
}

export default About