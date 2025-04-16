import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit, MdOutlineDeleteOutline, MdArrowDropDownCircle } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import ConfirmationModal from '../../../../common/ConfirmationModal';
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operation/courseApi';
import { setCourse } from '../../../../../slices/courseSlice';
const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null);
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId, courseId: course._id,
      token
    })
    if (result) {
      dispatch(setCourse(result))

    }
    setConfirmationModal(null);
  }
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId, sectionId, token
    })
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section);
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <div>
      <div className='rounded-lg bg-richblack-600 p-4'>
        {
          course?.courseContent?.map((section) => {
            return (
              <details key={section._id} open>
                <summary className='flex justify-between gap-x-3 border-b-2'>
                  <div className='flex items-center gap-2'>
                    <RxDropdownMenu />
                    <p>{section.sectionName}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center cursor-pointer'>
                      <MdModeEdit onClick={() => handleChangeEditSectionName(section._id, section.sectionName)} />
                      <MdOutlineDeleteOutline onClick={() => {
                        setConfirmationModal({
                          text1: "Delete this section",
                          text2: "All the lecture in this section will be deleted",
                          btn1text: "Delete",
                          btn2text: "Cancel",
                          btn1Handler: () => handleDeleteSection(section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }} />
                    </div>
                    <span>|</span>
                    <MdArrowDropDownCircle className='cursor-pointer' />
                  </div>

                </summary>
                <div>
                  {
                    section.subSection.map((data) => {
                      return (
                        <div key={data?._id}
                          onClick={() => setViewSubSection(data)} className='flex items-center justify-between gap-y-3 pl-5  text-richblack-50 bordee-b-2'>
                          <div className='flex items-center gap-2'>
                            <RxDropdownMenu />
                            <p>{data.title}</p>
                          </div>
                          <div className='flex items-center cursor-pointer' onClick={(e)=>e.stopPropagation()}>
                            <button
                              onClick={() =>
                                setEditSubSection({ ...data, sectionId: section._id })
                              }
                            >
                              <MdModeEdit className="text-xl text-richblack-300" />
                            </button>


                            <button onClick={() => {
                              setConfirmationModal({
                                text1: "Delete this sub section",
                                text2: "This lecture will be deleted",
                                btn1text: "Delete",
                                btn2text: "Cancel",
                                btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                btn2Handler: () => setConfirmationModal(null),
                              })
                            }}> <MdOutlineDeleteOutline /></button>
                          </div>


                        </div>
                      )
                    })
                  }
                  {/* {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdModeEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <MdOutlineDeleteOutline className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))} */}
                  <div onClick={() => setAddSubSection(section._id)}
                    className='mt-4 flex items-center gap-x-2 text-yellow-400 cursor-pointer'>
                    <FaPlus />
                    <p>Add lecture</p>
                  </div>
                </div>
              </details>
            )
          })
        }
      </div>
      {
        addSubSection ? (<SubSectionModal
          modalData={addSubSection} setModalData={setAddSubSection} add={true}
        />)
          : viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}
          />)
            : editSubSection ? (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}
            />)
              : (<div></div>)
      }
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default NestedView