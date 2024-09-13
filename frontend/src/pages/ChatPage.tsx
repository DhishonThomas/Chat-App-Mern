import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MAIN } from '../utils/constants'

const ChatPage = () => {
    const [chats,setChats]=useState("")

    const fetchChats=async()=>{
        const response=await axios.get(`${MAIN}/chats`)
        const data=response.data
console.log(data)
    }

    useEffect(()=>{
fetchChats()
    },[])


  return (
    <div>ChatPage</div>
  )
}

export default ChatPage