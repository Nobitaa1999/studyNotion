import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children,active,linkto}) => {
  return (
   
        <Link to={linkto}>
            <div className={`text-center text-[13px] font-bold px-6 py-3 rounded-md ${active? "bg-yellow-500 text-black":"bg-richblack-500"} hover:scale-95 transition-all duration-200`}>
            {children}
            </div>
            
        </Link>
   
  )
}

export default CTAButton