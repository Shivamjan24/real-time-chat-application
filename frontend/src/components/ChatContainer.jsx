import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import MessageInput from './MessageInput'
import { UseChat } from '../store/UseChat'

const ChatContainer = () => {

    const {setMessages,selectedUser}= UseChat()

    useEffect(()=>{setMessages()},[setMessages,selectedUser])
    return (
    <div>
        <ChatHeader/>
        <ChatBody/>
        <MessageInput/>
    </div>
  )
}

export default ChatContainer