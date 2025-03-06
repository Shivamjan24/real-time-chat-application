import {create} from "zustand"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"

export const UseAuth= create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth:false,

    checkAuth: async()=>{
        try {
            set({isCheckingAuth:true})
            const response= await axiosInstance.get("/auth/check")
            if(response.data)
                set({authUser:response.data,isCheckingAuth:false})
        } 
        catch (error) {
            console.log("error in checking auth:"+error)
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async(info)=>{
        try {
            set({isSigningUp:true})
            const res=await axiosInstance.post("/auth/signup",info)
            if(res.data)
            toast.success("User created successfully")
            set({authUser:res.data,isSigningUp:false})
        } 
        catch (error) {
            toast.success(error.response.data.message)
            console.log("error in signing up:"+error)
        }
        finally{
            set({isSigningUp:false})
        }
    },

    login: async (info)=>{
        try {
            set({isLoggingIn:true})
            const res=await axiosInstance.post("/auth/login",info)
            if(res.data)
            set({authUser:res.data,isLoggingIn:false})
        } 
        catch (error) {
            console.log("error in logging in:"+error)
        }
        finally{
            set({isLoggingIn:false})
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
        } 
        catch (error) {
            console.log("error in logging out:"+error)
        }
    }
}))
  