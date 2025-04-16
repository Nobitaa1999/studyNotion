import React, { useState } from 'react'
import { sidebarLink } from '../../../data/sidebarLink'
import {logout} from '../../../services/operation/authApi'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'


const Sidebar = () => {
  const{user,loading:profileLoading}=useSelector((state)=>state.profile);
  const{loading:authLoading}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const[confirmationModal,setConfirmationModal]=useState(null);

  if(profileLoading || authLoading){
    return (
      <div className='text-white mt-10'>
        Loading...
      </div>
    )
  }
  
  return (
    <div className='flex min-w-[200px] flex-col border-r-[1px] border-r-richblack-850 h-[calc(100vh-3.5rem)] bg-richblack-700 py-10'>
      <div className='flex flex-col'>
        {
          sidebarLink.map((link,index)=>{
            
            if(link.type && user?.accountType !== link.type)
            return null;

            return(
              <SidebarLink key={link.id} link={link} iconName={link.icon}/>
            )

          })
        }

      </div>
      <div className='mx-auto my-6 h-[1px] w-11/12 bg-richblack-800'></div>

      <div className='flex flex-col'>
        <SidebarLink link={{name:"Setting",path:"/dashboard/setting"}} iconName='VscSettingsGear'/>

        <button
        onClick={()=>setConfirmationModal({
          text1:'Are You Sure?',
          text2:'You will be logged out',
          btn1text:'Logout',
          btn2text:'Cancel',
          btn1Handler:()=> dispatch(logout(navigate)),
          btn2Handler:()=>setConfirmationModal(null)
        })}
        >
          <div className='flex items-center gap-x-2 text-white px-8 py-2 text-sm font-medium'>
          <VscSignOut />
          <span>Logout</span>
          </div>
        </button>

      </div>
      {confirmationModal&&<ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar