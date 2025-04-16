import React, { useEffect, useState } from 'react'

const RequirementField = ({name,label,register,errors,setValue,getValue}) => {
  const[requirement,setRequirement]=useState("")
  const[requirementList,setRequirementList]=useState([])

  useEffect(()=>{
    register(name,{
      required:true,
      validate:(value)=>value.length>0
    })
  },[])

  useEffect(()=>{
    setValue(name,requirementList)
  },[requirementList])

  const handleAddRequirement=()=>{
    if(requirement){
      setRequirementList([...requirementList,requirement])
      setRequirement("");
    }
  }

  const handleRemoveRequirement=(index)=>{
    const updatedRequirement=[...requirementList];
    updatedRequirement.splice(index,1);
    setRequirementList(updatedRequirement)
  }
  return (
    <div>
      <label>{label}<sup>*</sup></label>
      <div>
        <input
        type="text"
        id={name}
        value={requirement}
        onChange={(e)=>setRequirement(e.target.value)}
        className='w-full rounded-md p-2 bg-richblack-500'
        />
        <button type="button" onClick={handleAddRequirement}
         className='text-lg font-semibold  text-yellow-200 cursor-pointer'
         >
          Add
        </button>
      </div>
      {
        requirementList.length>0 && (
          <ul>
            {
              requirementList.map((item,ind)=>(
                <li key={ind} className='text-richblack-100'>
                  <span>{item} </span>
                  <button
                  type='button'
                  onClick={(index)=>handleRemoveRequirement(index)}
                  className='text-sm text-richblack-5 cursor-pointer'
                  >clear</button>
                </li>
              ))
            }
          </ul>
        )
      }
      {
        errors.name && (
         <span>{label} is require</span>
        )
      }
    </div>
  )
}

export default RequirementField