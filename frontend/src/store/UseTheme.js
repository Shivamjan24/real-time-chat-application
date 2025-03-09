import toast from "react-hot-toast";
import { create } from "zustand";

export const UseTheme= create((set)=>({
    theme:localStorage.getItem("theme") || "coffee",
    setTheme: async(data)=>{
        try {
            set({theme:data})
            localStorage.setItem("theme",data);
            toast.success("Theme Applied Successfully")
        } 
        catch (error) {
            toast.error("Error in Applying theme")
            console.log("error applying theme: "+error)
        }
    }
}))