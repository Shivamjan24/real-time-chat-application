import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const UseChat= create((set,get)=>({
    selectedUser:null,
    users:[],
    messages:[{}],

    setUsers: async()=>{
        try {
            const res=await axiosInstance.get("/messages/users")
            if(res)
            set({users:res.data})
        } 
        catch (error) {
            console.log("error in getting side users: "+error)
        }
        
    },

    setMessages: async()=>{
        try {
            const res=await axiosInstance.get(`/messages/${get().selectedUser._id}`)
            if(res)
            set({messages:res.data})
            console.log(get().messages)
        } 
        catch (error) {
            toast.error("error in retrieving messages")
            console.log("error in retrieving messages: "+error)
        }
    },

    sendMessage: async(msg)=>{
        console.log(msg)
        try {
            const res=await axiosInstance.post(`/messages/send/${get().selectedUser._id}`,msg)
            if(res)
            {
                console.log(res.data)
                toast.success("message sent successfully")
                set({messages:[res.data]})
            }
            
        } 
        catch (error) {
            toast.error(error.response.data.message);
        }
    },

    setSelectedUser:(selectedUser) => set({ selectedUser }),
       

}))