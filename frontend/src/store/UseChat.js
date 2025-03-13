import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { UseAuth } from "./UseAuth";

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
            let load=toast.loading("Sending Message...")
            const res=await axiosInstance.post(`/messages/send/${get().selectedUser._id}`,msg)
            if(res)
            {
                set({messages:[...get().messages,res.data]})
                toast.dismiss(load)
                toast.success("message sent successfully")
                console.log(get().messages)
            }
            
        } 
        catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: ()=>{
        if(!get().selectedUser)
            return;
        const socket=UseAuth.getState().socket

        socket.on("newmessage",(msg)=>{
            const isMessageSentFromSelectedUser = msg.senderid === get().selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            toast.success("new message recieved!!")
            set({messages:[...get().messages,msg]})
        })
    },

    unsubscribeFromMessages: ()=>{
        const socket=UseAuth.getState().socket

        socket.off("newmessage")
    },

    setSelectedUser:(selectedUser) => set({ selectedUser }),
       

}))