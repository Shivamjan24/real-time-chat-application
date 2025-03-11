import React from 'react'
import { UseChat } from '../store/UseChat'
import { X } from 'lucide-react'

const ChatHeader = () => {

    const {setSelectedUser,selectedUser}=UseChat()
    return (
    <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
        <img src={selectedUser.profilepic || "./avatar.png"} alt={selectedUser.fullname} className="w-10 h-10 rounded-full"/>
                
        <span className="text-sm font-medium text-primary">{selectedUser.fullname}</span>

        </div>
        <button className="cursor-pointer" onClick={()=>setSelectedUser(null)}>
            <X className="w-6 h-6 btn-primary"/> 
        </button>
    </div>
  )
}

export default ChatHeader