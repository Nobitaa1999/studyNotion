import { toast } from "react-hot-toast"
import { setLoading, setToken } from '../../slices/authSlice'
import { resetCart } from '../../slices/cartSlice'
import { setUser } from '../../slices/profileSlice'
import { apiConnector } from '../apiconnector'
import { endpoints } from '../apis'
import { profilEndPoints } from '../apis'
import { logout } from "./authApi"

const { CHANGEPASSWORD_API } = endpoints;
const{DELETEACCOUNT_API,UPDATEACCOUNTDETAIL_API,UPDATEIMAGE_API}=profilEndPoints;

export function changePassword(email,password,newPassword,conformNewPassword,token,navigate) {
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            console.log("Ankur",token);
            const response=await apiConnector("POST",CHANGEPASSWORD_API,{email,password,newPassword,conformNewPassword}, { Authorization: `Bearer ${token}`  })
            console.log("CHANGE PASSWORD RESPONSE...",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            navigate('/dashboard/my-profile')
            
            toast.success("Password has been successfully Changed")
        
        } catch (error) {
            console.log("PASSWORD NOT CHANGED",error);  
           
            toast.error("Unable to Change password")
        }
        dispatch(setLoading(false));
    }
}


export function deleteAccount(token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try {
            console.log(token);
            const response =await apiConnector("DELETE",DELETEACCOUNT_API,null, { Authorization: `Bearer ${token}`  })
            console.log("PRINTING RESPONSE....",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            
            dispatch(logout(navigate))
            
            toast.success("Account Deteleted")

        } catch (error) {
            console.log("Account not deleted",error);         
            toast.error('Account isn,t delete still')
        }
        dispatch(setLoading(false))
    }
}



export function updateProfile(gender,dateOfBirth,contactNumber,about,token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response=await apiConnector("PUT",UPDATEACCOUNTDETAIL_API,{gender,dateOfBirth,contactNumber,about},{Authorization:`Bearer ${token}`})
            console.log("Update Details Response...",response);
            if(!response.data.success){
                throw new Error(response.data.messsage);
            }
           
            navigate('/dashboard/my-profile');
            toast.success('Details updated successfully');
        } catch (error) {
            console.log("Error occur in hitting api..",error);
            toast.error("Details not updated");            
        }
        dispatch(setLoading(false));
    }
}


export function updateProfilePicture(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector(
          "PUT",
          UPDATEIMAGE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        )
        console.log(
          "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
          response
        )
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Display Picture Updated Successfully")
        dispatch(setUser(response.data.data))
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
      }
      toast.dismiss(toastId)
    }
  }