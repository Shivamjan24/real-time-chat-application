const logout = async (req,res)=>{
    try {
       res.cookie("jwttoken","",{maxAge:0}) 
       return res.status(200).json({message:"logged out successfully"})
    } 
    catch (error) {
        console.log("error:"+error)
        return res.status(500).json({message:"internal server error"})
    }
}

export default logout