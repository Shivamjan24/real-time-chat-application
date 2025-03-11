import React from 'react'
import { UseChat } from '../store/UseChat'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import DefaultContainer from '../components/DefaultContainer'

const Homepage = () => {

  const {selectedUser}=UseChat()
  return (
    <div className="mt-4 sm:max-w-2/3 items-center justify-center mx-auto">
      <div className="overflow-hidden grid grid-cols-4">

        <div className="col-span-1">
        <Sidebar/>
        </div>

        <div className="col-span-3">
        {selectedUser ? <ChatContainer/> : <DefaultContainer/>}
        </div>
        
      </div>  
    </div>
  )
}

export default Homepage