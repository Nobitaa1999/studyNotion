import React from 'react'

const Footer = () => {
    return (
        <div className='w-[100%] bg-richblack-700 '>
            <div className='py-8 flex flex-row text-richblack-50 gap-8 justify-center border-b '>
                <div>
                    <div className='text-2xl mb-3 text-white font-semibold' >StudyNotion</div>
                    <div className='font-semibold text-white'>Company</div>
                    <div className='flex flex-col gap-1'>
                        <p>About</p>
                        <p>Careers</p>
                        <p>Affiliates</p>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-1'>
                        <p className='font-semibold text-white'>Resources</p>
                        <p>Artical</p>
                        <p>Blogs</p>
                        <p>Chart sheet</p>
                        <p>Code challenges</p>
                        <p>Docs</p>
                        <p>Projects</p>
                        <p>Videos</p>
                        <p>Workspaces</p>
                    </div>
                    <div>
                        <p className='font-semibold text-white' >Support</p>
                        <p>Help center</p>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-white font-semibold'  >Plans</p>
                        <p>Paid membership</p>
                        <p>For students</p>
                        <p>Bussiness solution</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-white font-semibold'>Community</p>
                        <p>Forums</p>
                        <p>Chapters</p>
                        <p>Events</p>
                    </div>
                </div>
                <div className='flex flex-col gap-1 lg:border-l lg:px-7'>
                    <p className='text-white font-semibold'>Subjects</p>
                    <p>AI</p>
                    <p>Cloud Computing</p>
                    <p>Code Foundation</p>
                    <p>Computer Science</p>
                    <p>Cybersecurity</p>
                    <p>Data Analytics</p>
                    <p>Data Science</p>
                    <p>Data Visualization</p>
                    <p>Developer Tools</p>
                    <p>DevOps</p>
                    <p>Game Development</p>
                    <p>IT</p>
                    <p>Machine Learning</p>
                    <p>Maths</p>
                    <p>Web Design</p>
                    <p>web Devlopment</p>
                </div>
                <div className='flex flex-col gap-1 '>
                    <p className='text-white font-semibold' >Language</p>
                    <p>C</p>
                    <p>C++</p>
                    <p>C#</p>
                    <p>Go</p>
                    <p>HTML&CSS</p>
                    <p>Java</p>
                    <p>JavaScript</p>
                    <p>Kotlin</p>
                    <p>PHP</p>
                    <p>Python</p>
                    <p>Ruby</p>
                    <p>SQL</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-white font-semibold'>Career Building</p>
                    <p>Career Paths</p>
                    <p>Career Service</p>
                    <p>Interview Prep</p>
                    <p>Professional Certification</p>
                    <p>Full Catalog</p>
                    <p>Beta content</p>
                </div>
            </div>
            <div className='flex justify-between px-10 py-5 text-sm text-richblack-100 '>
                <div className='flex gap-4'>
                 <p>Private Policy</p>
                 <p>Cookiee Policy</p>
                 <p>Terms</p>
                </div>
                <div>
                    Made by Ankur Singh &#169; 2024
                    </div>                
            </div>
        </div>
    )
}

export default Footer