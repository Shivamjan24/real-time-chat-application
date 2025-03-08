import React from 'react'
import { Link } from 'react-router-dom'
import {Send,Settings,LogOut,User} from "lucide-react"
import { UseAuth } from '../store/UseAuth'

const Navbar = () => {
  const {authUser,logout}= UseAuth()
  return (
    <div className="flex flex-row justify-between border-b-1 p-2 bg-gray-600">
      <div className="flex flex-row items-center">
        <Link to={"/"}>
          <div>
          <Send size={30} color="green" fill="white"/>
          </div>
          <div>
          <p className="text-xl font-bold text-yellow-200">ChatPro</p>
          </div>
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <div className="mx-2">
          <Link to={"/settings"}>
          <Settings size={18}/>
          <p className="text-md font-md text-white">Settings</p>
          </Link>
        </div>
        {authUser && 
        <>
          <div className="mx-2">
          <Link to={"/profilepage"}>
          <User size={18}/>
          <p className="text-md font-md text-white">Profile</p>
          </Link>
          </div>
          <div className="mx-2">
          <button onClick={logout} className="cursor-pointer">
          <LogOut size={18}/>
          <p className="text-md font-md text-white">Logout</p>
          </button>
          </div>
        </>}
        
        
        
      </div>
      
    </div>
  )
}

export default Navbar