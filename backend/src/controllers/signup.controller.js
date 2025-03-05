import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createtoken } from "../lib/utils.js"

const signup = async (req,res)=>{
    const {fullname,email,password,profilepic}=req.body
    if(!fullname || !email || !password)
        return res.status(400).json({message:"all fields are required"})
    if(password.length<6)
        return res.status(400).json({message:"password must be atleast 6 characters long"})
    const user=await User.findOne({email})
    if(user){
        return res.status(400).json({message:"email already in use"})
    }

    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(password,salt);

    const newuser=new User({
        fullname,
        email,
        password:hashed,
    })

    if(newuser) {
        createtoken(newuser._id,res)
        await newuser.save();
        return res.status(201).json({message:"user created successfully",id:newuser._id,fullname:newuser.fullname,email:newuser.email,profilepic:newuser.profilepic})
    }
    else{
        return res.status(400).json({message:"invalid user data"})
    }
}

export default signup