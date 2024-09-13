import express from 'express'
import doenv from 'dotenv'
import chats from './src/data/data'
import connectDB from './config/db'


doenv.config()
connectDB();
const PORT=process.env.PORT||1000

const server=express()


server.get("/",(req,res)=>{
    res.send("server is working")
})

server.get("/chats",(req,res)=>{
    res.json({chats})
})

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})