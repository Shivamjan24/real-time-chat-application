import React from 'react'
import { UseChat } from '../store/UseChat'
import { X } from 'lucide-react'
import { UseAuth } from '../store/UseAuth'

const ChatHeader = () => {

    const {setSelectedUser,selectedUser}=UseChat()
    const {onlineUsers}=UseAuth()
    return (
    <div className="flex justify-between items-center mb-6 bg-base-300">
        <div className="relative flex gap-2 p-4">
        <img src={selectedUser.profilepic || "./avatar.png"} alt={selectedUser.fullname} className="w-10 h-10 rounded-full"/>
        {onlineUsers.includes(selectedUser._id) && (
                <span
                  className="absolute bottom-auto left-auto size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
        )}

        <span className="text-sm font-medium text-primary">{selectedUser.fullname}</span>

        </div>
        <button className="cursor-pointer" onClick={()=>setSelectedUser(null)}>
            <X className="w-6 h-6 btn-primary"/> 
        </button>
    </div>
  )
}

export default ChatHeader