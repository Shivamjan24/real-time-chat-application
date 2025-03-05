import { createtoken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

const login = async (req,res)=>{
    try{
        const {email,password}=req.body
        const user= await User.findOne({email})

        if(!user)
        return res.status(400).json({message:"invalid credentials"})
        
        const iscorrectpassword=await bcrypt.compare(password,user.password)

        if(!iscorrectpassword)
        return res.status(400).json({message:"invalid credentials"})

        createtoken(user._id,res)
        return res.status(200).json({fullname:user.fullname,id:user._id,email:user.email,profilepic:user.profilepic})
    }
    catch(error){
        console.log("error"+error)
        return res.status(500).json({message:"internal server error"})
    }
}

export default login;