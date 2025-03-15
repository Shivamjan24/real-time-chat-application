import React, { useRef } from 'react'
import { UseChat } from '../store/UseChat'
import { useEffect } from 'react'
import { UseAuth } from '../store/UseAuth'
import { formatMessageTime } from '../lib/utils'

const ChatBody = () => {

    const {authUser}= UseAuth()
    const {setMessages,messages,selectedUser,subscribeToMessages,unsubscribeFromMessages}= UseChat()
    
    const lastMessageRef=useRef(null)
    useEffect(()=>{

      subscribeToMessages();
      setMessages();

      return ()=>unsubscribeFromMessages();
    },[subscribeToMessages,unsubscribeFromMessages,setMessages])

    useEffect(()=>{
      if(lastMessageRef.current && messages)
        lastMessageRef.current.scrollIntoView({behaviour:"smooth"})
    },[messages])


    return (
    <div className="mt-4 mb-2 h-screen overflow-auto">
      {messages.map((msg)=>{
          return (<div key={msg._id} ref={lastMessageRef} className={`${msg.senderid==selectedUser._id ? "chat chat-start" : "chat chat-end"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="sender avatar"
                  src={msg.senderid==selectedUser._id  ? selectedUser.profilepic || "./avatar.png" : authUser.profilepic || "./avatar.png"} />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">{msg.createdAt?.split("T")[0]} {formatMessageTime(msg.createdAt)}</time>
            </div>
            {msg.image && msg.text && <div><img
                src={msg?.image}
                alt="image message"
                className="lg:w-35 lg:h-35 w-20 h-20 border-1 border-primary"
              />
              
              <div className={`chat-bubble ${msg.senderid!=selectedUser._id ? "chat-bubble-primary" : "chat-bubble-neutral"}`}>{msg?.text}</div></div>}
            {msg.image && !msg.text && <img
                src={msg?.image}
                alt="image message"
                className="lg:w-35 lg:h-35 w-20 h-20 border-1 border-primary"
              />}
            {msg.text && !msg.image && <div className={`chat-bubble ${msg.senderid!=selectedUser._id ? "chat-bubble-primary" : "chat-bubble-neutral"}`}>{msg?.text}</div>}
            <div className="chat-footer opacity-50">Delivered</div>
          </div>)}
      )}
        
        
    </div>
  )
}

export default ChatBody