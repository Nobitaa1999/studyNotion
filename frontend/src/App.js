import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import Home from "./pages/Home";
import Login from './pages/Login';
import Navbar from './component/common/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import UpdatePassword from './pages/UpdatePassword';
import OpenRoute from './component/core/auth/OpenRoute';
import PrivateRoute from './component/core/auth/PrivateRoute';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import MyProfile from './component/core/dashboard/MyProfile';
import EnrolledCourses from './component/core/dashboard/EnrolledCourses';
import Setting from './component/core/dashboard/Setting';
import Dashboard from './pages/Dashboard';
import Cart from './component/core/dashboard/Cart';
import MyCourses from './component/core/dashboard/MyCourses';
import AddCourse from './component/core/dashboard/Add Course/index';
import Error from './pages/Error';
import EditCourse from './component/core/dashboard/EditCourse'
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './component/core/courseDisplay/VideoDetails';
import Instructor from "./component/core/InstructorDashboard/Instructor";
import Hello from "./component/core/InstructorDashboard/hello"
function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inte ">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/*" element={<Error />} />

        <Route

          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />

          {
            user?.accountType === "Student" && (<>
              <Route path="/dashboard/cart" element={<Cart />} />
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </>
            )
          }

          {
            user?.accountType === "Instructor" && (<>
              <Route path="/dashboard/instructor" element={<Instructor />} />
              <Route path="/dashboard/my-courses" element={<MyCourses />} />
              <Route path="/dashboard/add-course" element={<AddCourse />} />
              <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
               
            </>
            )
          }

          <Route path="/dashboard/setting" element={<Setting />} />


        </Route>

        <Route
        element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          } >

            {
              user?.accountType === "Student" && (<>
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"  element={<VideoDetails/>}/>
              </>)
            }
        </Route>

      </Routes>
    </div>
  );
}

export default App;
