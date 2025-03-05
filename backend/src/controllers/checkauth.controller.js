
const checkauth= async(req,res)=>{
    try {
        return res.status(200).json(req.user)
    } 
    catch (error) {
        console.log("error in checkauth")
        return res.status(500).json({message:"internal server error"})    
    }
}
  
export default checkauth