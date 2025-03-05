import jwt from "jsonwebtoken"

export const createtoken= (id,res)=>{
    const token=jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    
    res.cookie("jwttoken",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
        secure:process.env.NODE_ENV!=="development"
    })
}