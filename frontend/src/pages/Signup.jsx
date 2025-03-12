import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UseAuth } from '../store/UseAuth'
import toast from 'react-hot-toast'
import AuthImagePattern from '../components/AuthImagePattern'
import { MessageCircle, User,Mail,Lock, Eye, EyeOff } from 'lucide-react'

const Signup = () => {

    const [showPassword,setShowPassword]=useState(false)
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
        <div className="grid lg:grid-cols-2 max-h-full">
            <div className="flex flex-col py-12">
                <div className="mt-4 mb-2 mx-auto items-center justify-center">
                    <p className="text-2xl font-bold text-primary">Create Account</p>
                </div>
                <div className="my-1 mx-auto items-center justify-center">
                    <p className="text-lg text-primary opacity-70">Get started with your free account</p>
                </div>
                <div className="mt-2 p-4 px-14">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-4">
                            <label className="text-md text-primary" for="fullname">FullName</label>
                            <div className="flex">
                            <div className="p-2">
                            <User size={16} className="btn-primary"/>
                            </div>
                            <div className="w-full">
                            <input type="text" name="fullname" className="rounded-md input input-bordered border-1 border-primary text-primary p-2 my-0.5" placeholder="John Doe" value={formdata.fullname} onChange={(e)=>(setformdata({...formdata,fullname:e.target.value}))}/>
                            </div>
                            </div>
                            <br/>

                            <label className="text-md text-primary" for="email">Email</label>
                            <div className="flex">
                            <div className="p-2">
                            <Mail size={16} className="btn-primary"/>
                            </div>
                            <div className="w-full">
                            <input type="text" name="email" className="rounded-md p-2 my-0.5 input input-bordered border-1 border-primary text-primary" placeholder="my@gmail.com" value={formdata.email} onChange={(e)=>(setformdata({...formdata,email:e.target.value}))}/>
                            </div>
                            </div>
                            <br/>

                            <label className="text-md text-primary" for="password">Password</label>
                            <div className="flex">
                            <div className="p-2">
                            <Lock size={16} className="btn-primary"/>
                            </div>
                            <div className="w-full">
                            <input type={showPassword ? "text" : "password"} name="password" className="rounded-md p-2 my-0.5 input input-bordered border-1 border-primary text-primary" placeholder="******" value={formdata.password} onChange={(e)=>(setformdata({...formdata,password:e.target.value}))}/>
                            </div>
                            <div className="p-2">
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                {showPassword ? (<Eye size={16}/>) : (<EyeOff size={16}/>)}
                            </button>
                            </div>
                            
                            </div>
                            <br/>

                            <button type="submit" className="rounded-md font-bold cursor-pointer py-2 px-auto btn btn-primary" disabled={isSigningUp}>Create Account</button>
                            <br/>
                            <div className="mx-auto justify-center">
                            <p className="text-neutral text-sm font-medium">Already have an account? <Link to="/login" className="link link-primary">Sign in</Link></p>
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