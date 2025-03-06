import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UseAuth } from '../store/UseAuth'
import toast from 'react-hot-toast'

const Signup = () => {

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
                <div className="mt-10 mb-2 mx-auto items-center justify-center">
                    <p className="text-2xl font-bold text-white">Create Account</p>
                </div>
                <div className="my-1 mx-auto items-center justify-center">
                    <p className="text-lg text-white opacity-40">Get started with your free account</p>
                </div>
                <div className="mt-2 p-4 px-14">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-4">
                            <label className="text-md text-white" for="fullname">FullName</label>
                            <input type="text" name="fullname" className="rounded-md border-1 border-gray-600 p-2 my-0.5 text-white" placeholder="John Doe" value={formdata.fullname} onChange={(e)=>(setformdata({...formdata,fullname:e.target.value}))}/>
                            <br/>

                            <label className="text-md text-white" for="email">Email</label>
                            <input type="text" name="email" className="rounded-md p-2 my-0.5 border-1 border-gray-600 text-white" placeholder="my@gmail.com" value={formdata.email} onChange={(e)=>(setformdata({...formdata,email:e.target.value}))}/>
                            <br/>

                            <label className="text-md text-white" for="password">Password</label>
                            <input type="password" name="password" className="rounded-md p-2 my-0.5 border-1 border-gray-600 text-white" placeholder="******" value={formdata.password} onChange={(e)=>(setformdata({...formdata,password:e.target.value}))}/>
                            <br/>

                            <button type="submit" className="rounded-md bg-amber-600 text-black font-bold cursor-pointer py-2 px-auto">Create Account</button>
                            <br/>
                            <div className="mx-auto justify-center">
                            <p className="text-white text-sm font-medium">Already have an account? <Link to="/login" className="link link-primary">Sign in</Link></p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup