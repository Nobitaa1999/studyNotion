import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operation/studentFeatureAPI'
import { fetchCourseDetails } from '../services/operation/courseApi'
import GetAvgRating from '../services/avgRating'
import Error from "./Error"
import ConfirmationModal from '../component/common/ConfirmationModal'
import RatingStar from '../component/common/RatingStar'
import { formatDate } from '../services/formatDate'
import { MdOutlineWatchLater } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import CourseDetailsCard from '../component/core/course/CourseDetailsCard'
import CourseAccordionBar from '../component/core/course/CourseAccordionBar'
import Footer from '../component/common/Footer'


const CourseDetails = () => {
    const { user } = useSelector((state) => state.profile)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { courseId } = useParams()
    const [confirmationModal, setConfirmationModal] = useState(null)

    const [courseData, setCourseData] = useState(null);
    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
                // console.log("Printing full course details",result);
            } catch (error) {
                console.log("course Detail not fetched", error);
            }

        }
        getCourseFullDetails();


    }, [courseId])

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        // console.log(courseData);
        const count = GetAvgRating(courseData?.courseDetail?.ratingAndReviews);
        // console.log(count);
        setAvgReviewCount(count)
    }, [courseData])

    const [totalNoOfLecture, setTotalNoOfLecture] = useState(0);
    useEffect(() => {
        let lecture = 0;

        courseData?.courseDetail?.courseContent?.forEach((sec) => {
            lecture += sec.subSection.length || 0;
        });
        // console.log("lecture",lecture);
        setTotalNoOfLecture(lecture);
    }, [courseData])

    const handlebtn1modal = () => {
        navigate('/login');
        setConfirmationModal(null);
    }

    const [isActive, setIsActive] = useState(Array(0))
    const handleActive = (id) => {
        // console.log("called", id)
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat([id])
                : isActive.filter((e) => e != id)
        )
    }

    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "Oops! You are not login.",
            btn1text: "login",
            btn1Handler: () => handlebtn1modal(),
            text2: "For buy course goto login",
            btn2text: "cancle",
            btn2Handler: () => setConfirmationModal(null),
        })

    }

    if (loading || !courseData) {
        return (
            <div>
                Loading.....
            </div>
        )
    }
    if (!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }
    const {
        courseName,
        courseDescription,
        instructor,
        createdAt,
        ratingAndReviews,
        studentEnrolled,
        whatYouWillLearn, courseContent
    } = courseData.courseDetail

    return (
        <div className='flex flex-col text-white'>
            <div className='bg-richblack-600 relative p-12'>

                <div className='flex flex-col gap-3 mx-auto justify-start w-10/12'>
                    <p className='text-4xl font-extrabold'>{courseName}</p>
                    <p className='text-richblack-50'>{courseDescription}</p>
                    <div className='flex gap-x-2'>
                        <span>{avgReviewCount}</span>
                        <RatingStar Review_Count={avgReviewCount} Star_Size={24} />
                        <span> {`(${ratingAndReviews.length} reviews)`}</span>
                        <span>{` ${studentEnrolled.length} students`}</span>
                    </div>
                    <p>{`Created by ${instructor.firstName} ${instructor.lastName} `}</p>
                    <div className='flex gap-4 '>
                        <div className='flex gap-1 items-center'>
                            <MdOutlineWatchLater />
                            <span>{`Created at ${formatDate(createdAt)}`}</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <TbWorld />
                            <span> English</span>
                        </div>

                    </div>
                </div>
                <div className='bg-richblack-500 absolute p-3 rounded-sm top-12 right-[10%]'>
                    <CourseDetailsCard
                        course={courseData.courseDetail}
                        setConfirmationModal={setConfirmationModal}
                        buyCourse={handleBuyCourse}
                    />
                </div>




            </div>


            <div className="box-content px-4 mx-auto  text-white lg:w-10/12">
                <div className="text-start  w-[60%]   ">
                    {/* What will you learn section */}
                    <div className="my-8 border border-richblack-600 p-8">
                        <p className="text-3xl font-semibold">What you'll learn</p>
                        <div className="mt-5">
                            {whatYouWillLearn}
                        </div>
                    </div>

                    {/* Course Content Section */}
                    <div className="max-w-[830px] ">
                        <div className="flex flex-col gap-3">
                            <p className="text-[28px] font-semibold">Course Content</p>
                            <div className="flex flex-wrap justify-between gap-2">
                                <div className="flex gap-2">
                                    <span>
                                        {courseContent.length} {`section(s)`}
                                    </span>
                                    <span>
                                        {totalNoOfLecture} {`lecture(s)`}
                                    </span>
                                    {/* <span>{response.data?.totalDuration} total length</span> */}
                                </div>
                                <div>
                                    <button
                                        className="text-yellow-25"
                                        onClick={() => setIsActive([])}
                                    >
                                        Collapse all sections
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="py-4">
                        {courseContent?.map((course, index) => (
                            <CourseAccordionBar
                                course={course}
                                key={index}
                                isActive={isActive}
                                handleActive={handleActive}
                            />
                        ))}
                    </div>
                    <div className="mb-12 py-4">
                        <p className="text-[28px] font-semibold">Author</p>
                        <div className="flex items-center gap-4 py-4">
                            <img
                                src={
                                    instructor.image
                                        ? instructor.image
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                }
                                alt="Author"
                                className="h-14 w-14 rounded-full object-cover"
                            />
                            <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
                        </div>
                        <p className="text-richblack-50">
                            {instructor?.additionalDetails?.about}
                        </p>
                    </div>
                </div>
            </div>

            <Footer/>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>




    )
}

export default CourseDetails