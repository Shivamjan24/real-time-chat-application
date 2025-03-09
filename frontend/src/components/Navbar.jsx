import React from 'react'
import { Link } from 'react-router-dom'
import {Send,Settings,LogOut,User} from "lucide-react"
import { UseAuth } from '../store/UseAuth'

const Navbar = () => {
  const {authUser,logout}= UseAuth()
  return (
    <div className="flex flex-row justify-between p-2 bg-neutral">
      <div className="flex flex-row items-center">
        <Link to={"/"}>
          <div>
          <Send size={30} className="btn-primary"/>
          </div>
          <div>
          <p className="text-xl font-bold text-primary">ChatPro</p>
          </div>
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <div className="mx-2">
          <Link to={"/settings"}>
          <Settings size={18} className="btn-primary"/>
          <p className="text-md font-md text-primary">Settings</p>
          </Link>
        </div>
        {authUser && 
        <>
          <div className="mx-2">
          <Link to={"/profilepage"}>
          <User size={18} className="btn-primary"/>
          <p className="text-md font-md text-primary">Profile</p>
          </Link>
          </div>
          <div className="mx-2">
          <button onClick={logout} className="cursor-pointer">
          <LogOut size={18} className="btn-primary"/>
          <p className="text-md font-md text-primary">Logout</p>
          </button>
          </div>
        </>}
        
        
        
      </div>
      
    </div>
  )
}

export default Navbar