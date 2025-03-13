import React from 'react'
import { UseChat } from '../store/UseChat'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import DefaultContainer from '../components/DefaultContainer'

const Homepage = () => {

  const {selectedUser}=UseChat()
  return (
    <div className="mt-4 sm:max-w-2/3 items-center justify-center mx-auto bg-base-200 ">
      <div className=" grid grid-cols-7">

        <div className={`${selectedUser ? "col-span-1" : "col-span-2"}`}>
        <Sidebar/>
        </div>

        <div className={`${selectedUser ? "col-span-6" : "col-span-5"}`}>
        {selectedUser ? <ChatContainer/> : <DefaultContainer/>}
        </div>
        
      </div>  
    </div>
  )
}

export default Homepage