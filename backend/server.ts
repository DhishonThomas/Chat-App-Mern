import express from 'express'
import doenv from 'dotenv'
doenv.config()

const PORT=process.env.PORT||1000

const server=express()


server.get("/",(req,res)=>{
    res.send("server is working")
})


server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})