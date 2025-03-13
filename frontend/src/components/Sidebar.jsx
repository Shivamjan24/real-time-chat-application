import { Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseChat } from '../store/UseChat'
import { UseAuth } from '../store/UseAuth'

const Sidebar = () => {

  const {users,setUsers,setSelectedUser,selectedUser}= UseChat()
  const{onlineUsers} =  UseAuth()

  const [onlinee,setonlinee]=useState([])

  const[showOnlineOnly,setShowOnlineOnly]=useState(false)
  useEffect(()=>{setUsers()},[setUsers])

  useEffect(() => {
    setonlinee(onlineUsers)
  },
  [onlineUsers])


  const filteredUsers= showOnlineOnly ? users.filter((user)=>onlinee.includes(user._id)) : users;

  return (
    <aside>
      <div className="flex flex-col ml-2 h-screen overflow-auto">
        <div className="p-2 flex gap-1 mb-4">
          <Users size={20} className="btn-primary"/>
          <span className="text-md font-medium text-primary md:block hidden">Contacts</span>
        </div>
        <div className="flex gap-1 p-2">
          <input type="checkbox" className="checkbox checkbox-sm" checked={showOnlineOnly} onChange={(e)=>setShowOnlineOnly(!showOnlineOnly)}/>
          <span className={`text-md font-light text-primary  ${selectedUser ? "hidden" : "md:block"} hidden`}>Show Online Users</span>
        </div>
        <div className="overflow-y-auto flex flex-col gap-1">
          {filteredUsers.map((user)=>{
            return (<button key={user._id} onClick={()=>setSelectedUser(user)} className={`cursor-pointer ${selectedUser?._id==user._id && "bg-base-300"} hover:bg-base-300`}>
              <div className="relative flex gap-2 items-center py-4">
                <img src={user.profilepic || "./avatar.png"} alt={user.fullname} className={`rounded-full ${selectedUser ? "h-12 w-12" : "w-10 h-10"}`}/>
                {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-auto left-auto size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
                <div className="flex flex-col gap-1 text-center">
                <span className={`text-sm font-medium text-primary ${selectedUser ? "hidden" : "block"}`}>{user.fullname}</span>
                {onlineUsers.includes(user._id) ? (<span className={`text-sm btn-primary font-light ${selectedUser ? "hidden" : "block"}`}>Online</span>) : (<span className={`text-sm btn-primary font-light  ${selectedUser ? "hidden" : "block"}`}>Offline</span>)}
                </div>
              </div>
            </button>)
          })}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar