import React, { useEffect, useState } from 'react'
import Footer from '../component/common/Footer';
import { useParams,useNavigate } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operation/PageAndComponentData';

import CourseCard from '../component/core/catalog/CourseCard'
import CourseSlider from '../component/core/catalog/CourseSlider'

import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const navigate = useNavigate();

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATAGORIES_API);
            
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
           
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
              console.log("check category id",categoryId);
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);

    console.log("catalogPageData",catalogPageData);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-white">
            <div className="spinner text">Loading...</div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return (
          <div className=' h-[80vh] flex gap-3 flex-col justify-center items-center '>
            <p className='text-2xl text-white font-bold '>No Course available for this Catagory</p>
            <button className='p-2 bg-yellow-300 text-richblack-500 rounded-md font-semibold' onClick={()=>navigate("/")} >

              Go to home
            </button>
            

          </div>
        )
      }
    
      return (
        // <div className=''>

        
        <div className='text-white '>
          {/* Hero Section */}
          <div className=" box-content bg-richblack-600 px-4 text-white">
            <div className="mx-auto w-10/12 flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}

          
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className='w-10/12 mx-auto'>
            <div className="section_heading text-xl">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.course}
              />
            </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className='w-10/12 mx-auto'>
            <div className="section_heading text-xl">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.course}
              />
            </div>
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className='w-10/12 mx-auto'>
            <div className="section_heading text-xl">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <CourseCard course={course} key={i} Height={"h-[250px]"} />
                  ))}
              </div>
            </div>
            </div>
          </div>
    
          <Footer />
        
        </div>
        
        // </div>
        
      )
    }

// const Catalog=()=>{
//   return (
//     <div className='text-white'>
//       hello
//       <Footer/>
//     </div>
//   )
// }
    
    export default Catalog