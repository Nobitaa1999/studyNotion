const Course = require('../models/Course')
const CourseProgress=require('../models/CourseProgress')
const { paymentSuccessEmail } = require('../utils/mailTemplates/paymentSuccessEmail')
const { instance } = require('../config/razorpay')
const User = require('../models/User')
const crypto = require("crypto");
const { mailSender } = require('../utils/mailSender')
const { default: mongoose } = require('mongoose')
const { courseEnrollmentEmail } = require('../utils/mailTemplates/courseEnrollEmail')


exports.capturePayment = async (req, res) => {
    const { course } = req.body;
    const userId = req.user.id;
    if (course.length === 0) {
        return res.status(200).json({
            success: false,
            message: "No course is selected in cart"
        })
    }

    let totalAmount = 0;
    for (const course_id of course) {

        // console.log("course_id",course_id);
        let oneCourse;
        try {
            oneCourse = await Course.findById(course_id);
            if (!oneCourse) {
                return res.status(200).json({
                    success: false,
                    message: "Could not find the course"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (oneCourse.studentEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Student is already Enrolled"
                })
            }
            totalAmount += oneCourse.price;
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

    }
    const option = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(option);
        res.json({
            success: true,
            message: paymentResponse
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not make order"
        })
    }
}

exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature
    const userId = req.user.id;
    const { course } = req.body;

    if (!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature) {
        return res.status(200).json({
            success: false,
            message: "payment failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        await enrolledstudent(course, userId, res)
        return res.status(200).json({
            success: true,
            message: "Payment verified"
        })
    }
    return res.status(200).json({
        success: false,
        message: "payment failed"
    })

}


const enrolledstudent = async (course, userId, res) => {
    if (!course || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data"
        })
    }
    for (const courseId of course) {
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentEnrolled: userId } },
                { new: true }
            )
            if (!enrolledCourse) {
                return res.status(400).json({
                    success: false,
                    message: "Course not found"
                })
            }

            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],
            })
            console.log("courseProgress",courseProgress);

            const enrolledstudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            )

            const emailResponce = await mailSender(
                enrolledstudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledstudent.firstName)
            )
            console.log("Email sent success fully", emailResponce);


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }



}


exports.sendPaymentSuccess = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;
    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the field"
        })
    }
    try {
        const enrollStudent = await User.findById(userId);
        await mailSender(
            enrollStudent.email,
            "Payment Recieved",
            `<h1>${enrollStudent.firstName}</h1>`
            // paymentSuccessEmail(`${enrollStudent.firstName}`,amount/100,orderId,paymentId)
        )
    } catch (error) {
        console.log("error in sending mail", error);
        return res.status(500).json({
            success: false,
            message: "Could not send email"
        })
    }
}
