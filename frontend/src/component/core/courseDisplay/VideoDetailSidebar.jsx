import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { FaAngleUp,FaAngleDown } from "react-icons/fa";


const VideoDetailSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const location = useLocation()
  const { courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures } = useSelector((state) => state.viewCourse)


  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length){
      
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex((data) => {
        return data._id === sectionId
      })

      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.
        subSection.
        findIndex((data) => {
          return data._id === subSectionId
        })

      const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.
        subSection?.[currentSubSectionIndex]?._id

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
      setVideoBarActive(activeSubSectionId)

    })()
  }, [courseSectionData, courseEntireData, location.pathname])
  // console.log("sec",courseEntireData);

  return (
    <div className='flex min-w-[250px] text-white flex-col border-r-[1px] border-r-richblack-850 h-[calc(100vh-3.5rem)] bg-richblack-700 '>
      
      <div className='flex flex-col    py-2 px-4'>
        <div className='flex justify-between items-center '>
        <div className='text-md font-medium p-2 rounded-full bg-slate-500' onClick={() => {
          navigate("/dashboard/enrolled-courses");
        }}>
          <IoIosArrowBack />
        </div>
        <div className='p-2 bg-yellow-400 text-black font-semibold rounded-md '
          onClick={() => setReviewModal(true)}>
          <button  >
            Add Review
          </button>
        </div>
        </div>

        <div className='border-b-[1px] py-4'>
        <p className='text-xl font-bold leading-none'>{courseEntireData?.courseName}</p>
        <p className='text-sm text-zinc-600'>{`${completedLectures.length}/${totalNoOfLectures}`}
        </p>      
      </div>

      
      </div>

      <div>
        {
          courseSectionData.map((sec,index)=>(
            <div
            onClick={()=>setActiveStatus(sec._id)}
            key={index}
            // className='overflow-scroll'
            >
              <div className={`flex bg-richblack-50 p-3 my-[4px] items-center justify-between `}>
                
                <p>{sec.sectionName}</p>
                {
                  sec._id===sectionId ?<FaAngleDown/>:<FaAngleUp/>
                }

              </div>

              <div>
                {
                  activeStatus === sec._id && (
                    <div>
                      {
                        sec.subSection.map((topic,ind)=>(
                          <div className={`flex gap-x-3 px-3 py-1 
                          ${videoBarActive===topic._id ?
                           "bg-yellow-400 text-black":
                            "bg-black text-white"}`}
                            key={ind}
                            onClick={()=>{
                              navigate(`/view-course/${courseEntireData._id}/section/${sec._id}/sub-section/${topic._id}`)
                              setVideoBarActive(topic._id);
                            }}
                            >
                            <input type="checkbox" 
                            checked={completedLectures.includes(topic._id)}/>
                            <span>{topic.title}</span>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>

            </div>
          ))
        }
        
      </div>               


    </div>
  )
}

export default VideoDetailSidebar