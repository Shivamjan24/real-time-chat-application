import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectroute = async(req,res,next)=>{
    try {
        const token=req.cookies.jwttoken
        if(!token)
        return res.status(401).json({message:"unauthorized- no token found"})
        
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded)
        return res.status(401).json({message:"unauthorized-no token found"})

        const user=await User.findById(decoded.id).select("-password")
        if(!user)
        return res.status(404).json({message:"user not found"})

        req.user=user
        next()
    } 
    catch (error) {
        console.log("error in protect route middleware")
        return res.status(501).json({message:"internal server error"})
    }
}
  