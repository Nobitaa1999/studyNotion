import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NavbarLink } from '../../data/navbar-link.js'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import CTAButton from '../core/homePage/CTAButton.jsx';
import ProfileDropDown from '../core/auth/ProfileDropDown.jsx';
import { categories } from '../../services/apis.js';
import { apiConnector } from '../../services/apiconnector.js';
import { MdKeyboardArrowDown } from "react-icons/md";


const Navbar = () => {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)
    const [loading, setLoading] = useState(false)
    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATAGORIES_API);
            // console.log("printing ", result.data.data);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("could not fetch category list");

        }
    }

    useEffect(() => {
        setLoading(true);
        fetchSubLinks();
        setLoading(false)
    }, [])

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath(route, location.pathname);
    }
    return (
        <div className='h-14 border-b-[1px] flex items-center border-b-richblack-100'>
            <div className='w-10/12  mx-auto flex flex-row justify-between items-center'>
                <Link to="/" className='text-2xl font-semibold text-white' >StudyNotion</Link>
                <nav>
                    <ul className='flex gap-6 text-richblack-5'>
                        {
                            NavbarLink.map((item, ind) => {
                                return (
                                    <li key={ind} className=''>
                                        {item.title === "Catalog" ?
                                            <div className='relative flex items-center text-white group' >
                                                <p >Catalog</p>
                                                <MdKeyboardArrowDown />

                                                <div className='invisible absolute flex flex-col items-center top-[50%] left-[50%] -translate-x-[50%] translate-y-[20%] rounded bg-white p-4 text-richblack-850 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-10'>

                                                    <div className='absolute h-4 w-4 bg-white left-[55%] translate-x-1 translate-y-[11%] top-[-10%] rotate-45'></div>

                                                    
                                                    {loading ? (
                                                        <p className="text-center">Loading...</p>
                                                    ) : (subLinks && subLinks.length) ? (
                                                        <>
                                                            {subLinks
                                                                ?.filter(
                                                                    (subLink) => subLink?.name?.trim()
                                                                )
                                                                ?.map((subLink, i) => (
                                                                    <Link
                                                                        to={`/catalog/${subLink.name
                                                                            .split(" ")
                                                                            .join("-")
                                                                            .toLowerCase()}`}
                                                                        className="rounded-lg bg-transparent  hover:bg-richblack-50"
                                                                        key={i}
                                                                    >
                                                                        <p>{subLink.name}</p>
                                                                        
                                                                        

                                                                    </Link>
                                                                    
                                                                ))}
                                                        </>
                                                    ) : (
                                                        <p className="text-center">No Courses Found</p>
                                                    )}

                                                </div>
                                            </div> :
                                            <Link to={item?.path}>
                                                <p className={`${matchRoute(item?.path) ? "text-yellow-200" : "text-white"}`}>
                                                    {item.title}
                                                </p>

                                            </Link>}
                                    </li>
                                )
                            })
                        }

                    </ul>
                </nav>

                <div className='flex gap-4 items-center text-white'>
                    {
                        user && user?.accountType !== 'Instructor' && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 &&
                                    <span>
                                        {totalItems}
                                    </span>
                                }
                            </Link>
                        )
                    }
                    {
                        token === null ? (
                            <div className='flex gap-3 items-center'>
                                <Link to="/signup">
                                    <button className='text-center text-[13px] font-bold px-4 py-2 border-richblack-100 border-[1px] rounded-md bg-richblack-700 hover:scale-95 transition-all duration-200' >Sign up</button>
                                </Link>
                                <Link to="/login">
                                    <button className='text-center text-[13px] font-bold px-4 py-2 border-richblack-100 border-[1px] rounded-md bg-richblack-700 hover:scale-95 transition-all duration-200' >Log in</button>
                                </Link>
                            </div>) : (
                            <ProfileDropDown />
                        )

                    }
                </div>


            </div>

        </div>
    )
}

export default Navbar