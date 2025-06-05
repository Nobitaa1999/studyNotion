import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
import "../../../../node_modules/video-react/dist/video-react.css"

import { FaCirclePlay } from "react-icons/fa6";
import Iconbtn from '../../common/Iconbtn';
import { markLectureAsComplete,fetchCourseDetailsRedux } from "../../../services/operation/courseApi"
import {updateCompletedLectures,clearCourseDetails} from "../../../slices/courseDetailSlice"

const VideoDetails = () => {
  const{courseId,sectionId,subSectionId}=useParams();
  const {token}=useSelector((state)=>state.auth)
  const { courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures } = useSelector((state) => state.viewCourse)

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const location=useLocation();
  const playerRef=useRef()

  const [videoData,setVideoData]=useState([])
  const [loading,setLoading]=useState(false)
  const[videoEnded,setVideoEnded]=useState(false);

  useEffect(()=>{
    ;(()=>{
      // if(!courseSectionData.length){
      //   console.log(courseSectionData.length);
      // return ;
      // }
      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses")
      }
      if (!courseSectionData || courseSectionData.length === 0) return;
      else{
        
        const filterSecData=courseSectionData?.filter((data)=> data._id===sectionId)
        console.log("Filtered Section:", filterSecData);
       console.log("Subsections:", filterSecData[0]?.subSection);
        if (!filterSecData || !Array.isArray(filterSecData[0].subSection)) {
          console.log("Section or subSection data not found.");
          return;
        }
        console.log("AA",courseSectionData);

        const filterSubsecData=filterSecData[0].
        subSection?.filter((data)=> data._id===subSectionId)
        if(!filterSubsecData){
          console.warn("Subsection not found.");
      return;
        }
        

        setVideoData(filterSubsecData[0])
        setVideoEnded(false)

      }

    })()
  }, [courseSectionData, courseId, sectionId, subSectionId]);
  // },[courseSectionData, courseEntireData, location.pathname])


  useEffect(() => {
    // dispatch(clearCourseDetails()); // Only if you have such an action
    dispatch(fetchCourseDetailsRedux(courseId)); // Trigger fetch for new course
  }, [courseId]);
  console.log("location.pathname",location.pathname);

  const firstVideo=()=>{

    const sectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)
    const subSectionIndex=courseSectionData[sectionIndex].subSection.findIndex((data)=>data._id===subSectionId)

    if(sectionIndex===0 && subSectionIndex===0){
      return true;
    }else{
      return false;
    }

  }
  const lastVideo=()=>{
    const sectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)
    const subSectionIndex=courseSectionData[sectionIndex].subSection.findIndex((data)=>data._id===subSectionId)

    const lengthOfSubSection=courseSectionData[sectionIndex].subSection.length;

    if(sectionIndex===courseSectionData.length-1 && subSectionIndex===lengthOfSubSection-1){
      return true;
    }else{
      return false;
    }

  }
  const goToNextVideo=()=>{
    const sectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)
    const subSectionIndex=courseSectionData[sectionIndex].subSection.findIndex((data)=>data._id===subSectionId)

    const lengthOfSubSection=courseSectionData[sectionIndex].subSection.length;
    
    if(subSectionIndex<lengthOfSubSection-1){
      const nextTopicId=courseSectionData[sectionIndex].subSection[subSectionIndex+1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextTopicId}`)

      
    }else{
      const nextSectionId=courseSectionData[sectionIndex+1]._id;
      const nextSubsectionId=courseSectionData[sectionIndex+1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`)
    }


  }
  const goToPrevVideo=()=>{
    const sectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)
    const subSectionIndex=courseSectionData[sectionIndex].subSection.findIndex((data)=>data._id===subSectionId)

    
    if(subSectionIndex!==0){
      const prevTopicId=courseSectionData[sectionIndex].subSection[subSectionIndex-1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevTopicId}`)
    }else{
      const prevSectionId=courseSectionData[sectionIndex-1]._id;
      const lengthOfSubSection=courseSectionData[sectionIndex-1].subSection.length;
      const prevSubsectionId=courseSectionData[sectionIndex-1].subSection[lengthOfSubSection-1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubsectionId}`)
    }

  }
  const lectureCompleteHandler=async()=>{
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }
  
  // return (
  //   <div className="h-full w-full flex flex-col px-2 pb-4">
  //     {
  //       !videoData ?(
  //         <div>No Data Found</div>
  //       ) : (
  //         // <div className="w-full aspect-video max-w-5xl mx-auto">
  //         <Player
  //         ref={playerRef}
  //         // aspectRatio="15:5"
  //         playsInline
  //         onEnded={()=>setVideoEnded(true)}
  //         src={videoData?.videoUrl}
  //         className="h-full w-full rounded-md object-fill"
          
  //         >
  //           <FaCirclePlay />
  //           {
  //             videoEnded && (
  //               <div>
  //                 {
  //                   !completedLectures.includes(subSectionId) &&(
  //                     <Iconbtn
  //                     disabled={loading}
  //                     onclick={()=>lectureCompleteHandler()}
  //                     text={!loading ? "Mark As Completed":"Loading.."}/>
  //                   )
  //                 }

  //                 <Iconbtn
  //                 disabled={loading}
  //                 onclick={()=>{
  //                   if(playerRef?.current){
  //                     playerRef.current?.seek(0);
  //                     setVideoEnded(false)
  //                   }
  //                 }}
  //                 text="Rewatch"
  //                 customClasses='text-xl'
  //                 />
  //                 <div>
  //                   {!firstVideo()&&(
  //                     <button
  //                     disabled={loading}
  //                     onClick={goToPrevVideo}>
  //                       Prev

  //                     </button>
  //                   )}
  //                   {
  //                     !lastVideo() && (
  //                       <button
  //                       disabled={loading}
  //                       onClick={goToNextVideo}>
  //                         Next

  //                       </button>
  //                     )
  //                   }
  //                 </div>
  //               </div>
  //             )
  //           }

  //         </Player>
  //         // </div>
  //       )
  //     }
  //     <h1>{videoData?.title}</h1>
  //     <p>{videoData?.description}</p>
  //   </div>
  // )
  return (
    <div className="h-full w-full flex flex-col px-2 pb-4">
      {
        !videoData ? (
          <div>No Data Found</div>
        ) : (
          <div className="h-[calc(100vh-4.5rem)] w-full bg-richblack-900 flex items-center justify-center ">
          <div className="h-full flex-grow flex items-center justify-center bg-richblack-900">
          <div className="h-full w-full relative">
          {/* <div className="w-full max-w-[1000px] aspect-video relative"> */}
            <Player
              ref={playerRef}
              playsInline
              fluid={false}
              height="100%"
              width="100%"
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
              className="w-full h-full rounded-md object-contain"
            >
              <FaCirclePlay />
              {
                videoEnded && (
                  <div className="absolute bottom-[50%] left-[50%] z-10 space-x-4 flex flex-col gap-3">
                    {
                      !completedLectures.includes(subSectionId) && (
                        
                        <Iconbtn
                          disabled={loading}
                          onclick={() => lectureCompleteHandler()}
                          text={!loading ? "Mark As Completed" : "Loading.."}
                           />
                      )
                    }
        
                    <Iconbtn
                    className="top-6"
                      disabled={loading}
                      onclick={() => {
                        if (playerRef?.current) {
                          playerRef.current?.seek(0);
                          setVideoEnded(false);
                        }
                      }}
                      text="Rewatch"
                      customClasses='text-xl'
                    />
                    <div className="inline-flex gap-3">
                      {!firstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className="bg-gray-200 text-black px-3 py-1 rounded-md"
                        >
                          Prev
                        </button>
                      )}
                      {!lastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className="bg-gray-200 text-black px-3 py-1 rounded-md"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                )
              }
            </Player>
          </div>
          </div>
        </div>
        

        )
      }
  
      <div className="mt-4">
        <h1 className="text-xl font-semibold text-white">{videoData?.title}</h1>
        <p className="text-sm text-gray-300">{videoData?.description}</p>
      </div>
    </div>
  );
  
}

export default VideoDetails