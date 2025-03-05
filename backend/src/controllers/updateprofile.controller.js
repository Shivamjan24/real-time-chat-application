import jwt from "jsonwebtoken"
import cloudinary from "../lib/cloudinary.js"
import User from "../models/user.model.js"

const updateprofile= async(req,res)=>{
    try {
        const {profilepic}=req.body
        const userid=req.user._id

        if(!profilepic)
        return res.status(400),json({message:"profilepic is required"})

        const uploaded= await cloudinary.uploader.upload(profilepic)

        const updateduser=await User.findByIdAndUpdate(userid,{profilepic:uploaded.secure_url},{new:true}).select("-password")
        return res.status(200).json(updateduser)

    } 
    catch (error) {
        console.log("error in update-profile")
        return res.status(501).json({message:"internal server error"})
    }
}

export default updateprofile