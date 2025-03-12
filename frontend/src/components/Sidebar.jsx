import { Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { UseChat } from '../store/UseChat'
import { UseAuth } from '../store/UseAuth'

const Sidebar = () => {

  const {users,setUsers,setSelectedUser,selectedUser}= UseChat()
  const{onlineUsers} =  UseAuth()
  useEffect(()=>{setUsers()},[setUsers])

  return (
    <aside>
      <div className="flex flex-col ml-2">
        <div className="p-2 flex gap-1 mb-4">
          <Users size={20} className="btn-primary"/>
          <span className="text-md font-medium text-primary md:block hidden">Contacts</span>
        </div>
        <div className="overflow-y-auto flex flex-col gap-1">
          {users.map((user)=>{
            return (<button key={user._id} onClick={()=>setSelectedUser(user)} className={`cursor-pointer ${selectedUser?._id==user._id && "bg-base-300"} hover:bg-base-300`}>
              <div className="relative flex gap-2 items-center">
                <img src={user.profilepic || "./avatar.png"} alt={user.fullname} className="w-8 h-8 rounded-full"/>
                {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-auto left-auto size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
                
                <span className={`text-sm font-medium text-primary ${selectedUser ? "hidden" : "block"}`}>{user.fullname}</span>
              </div>
            </button>)
          })}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar