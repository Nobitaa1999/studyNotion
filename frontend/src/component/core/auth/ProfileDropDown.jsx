import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../services/operation/authApi';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link,useNavigate } from 'react-router-dom';

const ProfileDropDown = () => {
  const {user}=useSelector((state)=>state.profile)
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);
  return (
    <div className='flex items-center justify-between relative'>
      {user?.image && (
        <img src={user.image} className='rounded-full h-8 aspect-square object-cover' alt="User profile" />
      )}
      <div className='group'>
        <MdKeyboardArrowDown />
       <div className='invisible absolute flex flex-col items-center cursor-pointer top-[50%] left-[50%] -translate-x-[50%] translate-y-[20%] rounded bg-white text-richblack-850 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[100px] z-10'>
        <ul>
          <li><Link to='dashboard/my-profile'>Dashboard</Link></li>
          <li onClick={()=>(dispatch(logout(navigate)))}><Link to='logout'>Logout</Link></li>
          
        </ul>
       </div>
       </div>

    </div>
  )
}

export default ProfileDropDown