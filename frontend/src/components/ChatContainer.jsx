import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import MessageInput from './MessageInput'
import { UseChat } from '../store/UseChat'

const ChatContainer = () => {

    const {setMessages}= UseChat()

    useEffect(()=>{setMessages()},[setMessages])
    return (
    <div>
        <ChatHeader/>
        <ChatBody/>
        <MessageInput/>
    </div>
  )
}

export default ChatContainer