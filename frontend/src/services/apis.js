const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints={
    SENDOTP_API:BASE_URL+'/auth/sendOtp',
    SIGNUP_API:BASE_URL+'/auth/signup',
    LOGIN_API:BASE_URL+'/auth/login',
    RESETPASSWORD_API:BASE_URL+'/auth/reset-password',
    RESETPASSWORDTOKEN_API:BASE_URL+'/auth/reset-password-token',
    CHANGEPASSWORD_API:BASE_URL+'/auth/change-password',
}

export const profilEndPoints={
    DELETEACCOUNT_API:BASE_URL+'/profile/delete-profile',
    UPDATEACCOUNTDETAIL_API:BASE_URL+'/profile/update-profile-details',
    UPDATEIMAGE_API:BASE_URL+'/profile/update-profile-picture',
    GET_ENROLLED_COURSES_API:BASE_URL+'/profile/get-enrolled-course',
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

export const studentEndpoints={
    COURSE_PAYMENT_API: BASE_URL+"/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL+"/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL+"/payment/sendPaymentSuccess"
}

export const categories={
    CATAGORIES_API:BASE_URL+"/course/showAllCategories",
    CATALOGPAGEDATA_API: BASE_URL + "/course/show-category-pagedetail",
}

export const coursesEndPoints={
    GET_INSTRUCTOR_COURSES_API:BASE_URL+'/course/fetch-instructor-course',
    CREATE_COURSE_API:BASE_URL+'/course/create-course',
    EDIT_COURSE_API:BASE_URL+'/course/edit-course',
    DELETE_COURSE_API:BASE_URL+'/course/delete-course',
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL+'/course/get-full-course-details',
    GET_ALL_COURSES: BASE_URL+'/course/getAllCourses',
    FETCH_COURSE_DETAILS: BASE_URL+'/course/get-course-detail',


    CREATE_SECTION_API:BASE_URL+'/course/create-section',
    UPDATE_SECTION_API:BASE_URL+'/course/update-section',
    DELETE_SECTION_API:BASE_URL+'/course/delete-section',


    CREATE_SUBSECTION_API:BASE_URL+'/course/add-subsection',
    UPDATE_SUBSECTION_API:BASE_URL+'/course/update-subsection',
    DELETE_SUBSECTION_API:BASE_URL+'/course/delete-subsection',

    CREATE_RATING_API: BASE_URL + "/course/createRating",
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
}