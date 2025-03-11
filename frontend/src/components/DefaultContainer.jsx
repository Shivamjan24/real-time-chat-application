import React from 'react'
import { Send } from 'lucide-react'

const DefaultContainer = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="mb-5 transition-all animate-bounce">
          <Send size={30} className="btn-primary"/>
      </div>
      <div className="mb-5">
        <p className="text-xl font-extrabold text-primary">Welcome to ChatPro!!!</p>
      </div>
      <div className="mb-5">
        <p className="text-md font-medium text-primary">Select a conversation from the sidebar to start chatting</p>
      </div>
    </div>
  )
}

export default DefaultContainer