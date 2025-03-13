import { Camera, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import { UseAuth } from '../store/UseAuth'

const Profilepage = () => {

  const {authUser,isUpdatingProfile,updateprofile} = UseAuth()
  const [selectedImage,setSelectedImage]= useState(null)

  const handleImageUpload= async(e)=>{
    const upload=e.target.files[0]

    if(!upload)
    return;

    const reader=new FileReader()
    reader.readAsDataURL(upload)

    reader.onload= async()=>{
      const file=reader.result
      setSelectedImage(file)
      await updateprofile({profilepic:file})
    }
  }
  return (
    <div className="max-w-1/2 mx-auto max-h-full items-center justify-center my-12 backdrop-opacity-50 h-screen overflow-auto px-4">
      <div className="py-5 text-center">
        <h1 className="text-xl font-bold mb-2">Profile</h1>
        <p className="text-lg font-medium mb-3">Your Profile Information</p>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilepic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-primary">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div className="mt-6 mb-2 flex gap-1">
            <User size={14}/>
            <p className="text-sm text-primary">Full Name</p>
          </div>
          <div className="w-full h-10 border-1 rounded-lg py-2 text-left pl-4 font-medium">
            <span className="text-neutral">{authUser?.fullname}</span>
          </div>
          <div className="mt-6 mb-2 flex gap-1">
            <Mail size={14}/>
            <p className="text-sm text-primary">Email Address</p>
          </div>
          <div className="w-full h-10 border-1 rounded-lg py-2 text-left pl-4 font-medium">
            <span className="text-neutral">{authUser?.email}</span>
          </div>
      </div>
      <div className="text-left mt-10">
        <h1 className="text-xl font-bold">Account Information</h1>
      </div>
      <div className="flex justify-between mt-4 border-b-1 py-4">
        <h1 className="font-medium text-primary">Member Since</h1>
        <p className="text-sm text-neutral">{authUser.createdAt?.split("T")[0]}</p>
      </div>
      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-primary">Account Status</h1>
        <p className="text-sm text-green-600">Active</p>
      </div>
    </div>
  )
}

export default Profilepage