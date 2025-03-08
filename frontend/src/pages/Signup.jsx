import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UseAuth } from '../store/UseAuth'
import toast from 'react-hot-toast'
import AuthImagePattern from '../components/AuthImagePattern'
import { MessageCircle, User,Mail,Lock, Eye, EyeOff } from 'lucide-react'

const Signup = () => {

    const [showPassword,setShowPassword]=useState(true)
    const {isSigningUp,signup}=UseAuth()
    const [formdata,setformdata]=useState({fullname:null,email:null,password:null})

    const validateData= ()=>{
        if(formdata.fullname==null || formdata.email==null || formdata.password==null)
            return toast.error("All fields are required")
        else if(formdata.password.length<6)
            return toast.error("Password must be atleast 6 characters")
        if (!/\S+@\S+\.\S+/.test(formdata.email)) 
            return toast.error("Invalid email format");

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const success = validateData();
    
        if (success === true) signup(formdata);
      };

    return (
        <div className="grid grid-cols-2 max-h-screen">
            <div className="flex flex-col py-12">
                <div className="mt-4 mb-2 mx-auto items-center justify-center">
                    <p className="text-2xl font-bold text-white">Create Account</p>
                </div>
                <div className="my-1 mx-auto items-center justify-center">
                    <p className="text-lg text-white opacity-40">Get started with your free account</p>
                </div>
                <div className="mt-2 p-4 px-14">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-4">
                            <label className="text-md text-white" for="fullname">FullName</label>
                            <div className="flex">
                            <div className="p-2">
                            <User size={16} color="white"/>
                            </div>
                            <div>
                            <input type="text" name="fullname" className="rounded-md border-1 border-gray-600 p-2 my-0.5 text-white hover:bg-black" placeholder="John Doe" value={formdata.fullname} onChange={(e)=>(setformdata({...formdata,fullname:e.target.value}))}/>
                            </div>
                            </div>
                            <br/>

                            <label className="text-md text-white" for="email">Email</label>
                            <div className="flex">
                            <div className="p-2">
                            <Mail size={16} color="white"/>
                            </div>
                            <div>
                            <input type="text" name="email" className="rounded-md p-2 my-0.5 border-1 border-gray-600 hover:bg-black text-white" placeholder="my@gmail.com" value={formdata.email} onChange={(e)=>(setformdata({...formdata,email:e.target.value}))}/>
                            </div>
                            </div>
                            <br/>

                            <label className="text-md text-white" for="password">Password</label>
                            <div className="flex">
                            <div className="p-2">
                            <Lock size={16} color="white"/>
                            </div>
                            <div>
                            <input type={showPassword ? "text" : "password"} name="password" className="rounded-md p-2 my-0.5 border-1 border-gray-600 text-white hover:bg-black" placeholder="******" value={formdata.password} onChange={(e)=>(setformdata({...formdata,password:e.target.value}))}/>
                            </div>
                            <div className="p-2">
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                {showPassword ? (<Eye size={16}/>) : (<EyeOff size={16}/>)}
                            </button>
                            </div>
                            
                            </div>
                            <br/>

                            <button type="submit" className="rounded-md bg-amber-600 text-black font-bold cursor-pointer py-2 px-auto hover:bg-black hover:text-amber-600" disabled={isSigningUp}>Create Account</button>
                            <br/>
                            <div className="mx-auto justify-center">
                            <p className="text-white text-sm font-medium">Already have an account? <Link to="/login" className="link link-primary">Sign in</Link></p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <div className="flex flex-col py-12">
                <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
                />
                
            </div>
        </div>
    )
}

export default Signup