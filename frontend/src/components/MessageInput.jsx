import { Image, Send, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { UseChat } from '../store/UseChat'
import toast from 'react-hot-toast'

const MessageInput = () => {

    const [message,setmessage]=useState({text:"",image:null})
    const [text,settext]=useState("")
    const [image, setimage] = useState(null)
    const {sendMessage}=UseChat()
    const fileInputRef=useRef(null)

    const handleimageinput= async(e)=>{
        const file=e.target.files[0]
        if(!file.type.startsWith("image/"))
        return toast.error("Please select an image file")
        const reader=new FileReader()
        reader.onloadend= ()=>{
            reader.readAsDataURL(file)
            setimage(reader.result)
        }
    }

    const removeimage = async()=>{
        setimage(null)
        if(fileInputRef.current)
            fileInputRef.current.value=""
    }

    const handlesubmit= async (e) =>{
        e.preventDefault()
        if(!text.trim() && !image)
            return;
        try {
            await sendMessage({text,image})
            settext("")
            setimage(null)
            if(fileInputRef.current)
            fileInputRef.current.value=""
        } 
        catch (error) {
            console.log("error in sending message: "+error)
        }    
    }
    return (
    <div className="flex flex-col">
    {image && (
    <div className="justify-start pl-2 mb-2 relative">
        <img src={image} className="w-30 h-30 border-1 border-primary"/>
        <button className="absolute -mt-30 -mr-30 cursor-pointer rounded-full bg-base-300
              flex items-center justify-center" onClick={removeimage}>
            <X size={15} />
        </button>
    </div>)}
    <div className="flex gap-1.5">
        <form onSubmit={handlesubmit}>
        <div className="w-full flex gap-1.5">
        <input type="text" value={text} onChange={(e)=>{settext(e.target.value)}} className="w-full input input-primary py-2" placeholder="Type a message.."/>
        <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleimageinput}/>
            <button type="button" className={`${image ?"text-green-500" : "text-zinc-300"}`} onClick={()=>fileInputRef.current?.click()}>
            <Image size={30}/>
            </button>
        <button type="submit" className="btn btn-sm btn-circle cursor-pointer" disabled={!text.trim() && !image}>
            <Send size={24}/>
        </button>
        </div>
        </form>
        
    </div>
    </div>
  )
}

export default MessageInput