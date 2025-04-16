import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import{ toast } from "react-hot-toast"
import{resetCart} from '../../slices/cartSlice'
import{setPaymentLoading} from '../../slices/courseSlice'
const{COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src=src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
        
    })
}

export async function buyCourse(token,course,userDetails,navigate,dispatch){
    const toastId =toast.loading("Loading hai....")

    try {
        const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        // console.log("res",res);

        if(!res){
            toast.error("RazorPay SDK faild to load")
            return;
        }

        // console.log("Token being used:", token);

        const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,
        {course},
        {Authorization: `Bearer ${token}`})
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }

        // console.log("Printing order response",orderResponse);
        const option={
            key:process.env.REACT_APP_RAZORPAY_KEY_ID,
            currency:orderResponse.data.message.currency,
            amount:orderResponse.data.message.amount,
            order_id:orderResponse.data.message.id,
            description:"Thanku for purchasing the course",
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            name:"StudyNotion",
            handler:function(response){
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);
                verifyPayment({...response,course},token,navigate,dispatch)
            }
        }
        const paymentObject=new window.Razorpay(option);
        paymentObject.open();
        paymentObject.on("Payment failed",function(response){
            toast.error("Payment failed")
            console.log(response.error);
        })
    } catch (error) {
        console.log("Payment api error",error);
        toast.error("Payment not done...")
        
    }
    toast.dismiss(toastId)

}


async function sendPaymentSuccessEmail(response,amount,token){
    try {
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        },{
            Authorization: `Bearer ${token}`
        })
    } catch (error) {
        console.log("Payment success email error",error);


    }
}



async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId=toast.loading("Verifing Payment")
    dispatch(setPaymentLoading(true));
    try {
        const response=await apiConnector("POST",COURSE_VERIFY_API,bodyData,
        {Authorization:`Bearer ${token}`})
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
        toast.success("Payment Successful you are added to the course")
        
    } catch (error) {
        console.log("Payment verify error",error);
        toast.error("Could not verify Payment")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false));
}