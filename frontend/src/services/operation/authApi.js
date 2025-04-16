import { toast } from "react-hot-toast"
import { setLoading, setToken } from '../../slices/authSlice'
import { resetCart } from '../../slices/cartSlice'
import { setUser } from '../../slices/profileSlice'
import { apiConnector } from '../apiconnector'
import { endpoints } from '../apis'


const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSWORDTOKEN_API, RESETPASSWORD_API,CHANGEPASSWORD_API } = endpoints;

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SENDOTP_API,{
                email, checkUserPresent: true
            })
            console.log("SENDING API RESPONSE......", response);
            console.log(response.data.success);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            
            navigate("/verify-email")
            toast.success("OTP Sent successfull")
        } catch (error) {
            console.log('SENDING API ERROR.....', error);
            toast.error("Could not send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function signup(accountType, firstName, lastName, email, password, conformPassword, otp, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType, firstName, lastName, email, password, conformPassword, otp
            })

            console.log("Signup api response.....",response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup successfull")
            navigate("/login")
        } catch (error) {
            console.log("Signup Api Error...", error);
            toast.error("Signup failed")
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}


export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        console.log(LOGIN_API);
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email, password
            })

            console.log("LOGIN API RESPONSE........", response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            
           
            dispatch(setToken(response.data.data.token))
            
            const userImage = response.data.data.image ? response.data.data.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.data?.firstName} ${response?.data?.data?.lastName}`
          
            dispatch(setUser({ ...response.data.data, image: userImage }))
            
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.data)) 
            toast.success("Login Successfull")
            navigate("/dashboard/my-profile");
           
        } catch (error) {
            console.log("LOGIN API ERROR.......", error);
            toast.error("Login failed")

        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out")
        navigate("/")
    }
}

export function getPasswordResetToken (email ,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response=await apiConnector("POST",RESETPASSWORDTOKEN_API,{email})
            console.log("RESET PASSWORD TOKEN ......",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset email sent")
            setEmailSent(true);
        } catch (error) {
            console.log("RESET PASSWORD TOKEN ERROR",error);  
            toast.error("Faild to test email")          
        }
        dispatch(setLoading(false));
        
    }
}


export function resetPassword (password,conformPassword,token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            console.log(token);
            const response=await apiConnector("POST",RESETPASSWORD_API,{password,conformPassword,token});
            
            console.log("RESET PASSWORD RESPONSE....",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            
            navigate("/login")
            toast.success("Password has been successfully reset")
        } catch (error) {
            console.log("RESET PASSWORD TOKEN ERROR",error);  
            toast.error("Unable to reset password&token",token)          
        }
        dispatch(setLoading(false));
    }
}

