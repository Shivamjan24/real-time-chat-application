import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getsideusers= async (req,res)=>{
    try {
        const {_id:userid}=req.user;

        const users= await User.find({_id:{$ne:userid}}).select("-password")
        return res.status(200).json(users)
    } 
    catch (error) {
        console.log("error in getside users")
        res.status(500).json("internal server error")
    }
}

export const getmessages= async(req,res)=>{
    try {
        const {id:recid}=req.params
        const myid=req.user._id
        const messages=await Message.find({$or:[{senderid:myid,receiverid:recid},{senderid:recid,receiverid:myid}]})
        return res.status(200).json(messages)
    } 
    catch (error) {
        console.log("error in getmessages")
        return res.status(500).json("internal server error")
    }
}

export const sendmessage= async(req,res)=>{
    try {
        const senderid=req.user._id
        const {id:receiverid}=req.params
        const {text,image}=req.body

        let imagee
        if(image){
            const uploaded= await cloudinary.uploader.upload(image)
            imagee=uploaded.secure_url
        }
        const newmessage= new Message({
            senderid,
            receiverid,
            text,
            image:imagee
        })
        await newmessage.save()

        return res.status(201).json(newmessage)
    } 
    catch (error) {
        console.log("error in send message route");
        return res.status(500).json("internal server error")
    }
}