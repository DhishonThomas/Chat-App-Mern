import express from 'express'
import doenv from 'dotenv'
import connectDB from './config/db'
import userRoutes from './router/userRouter'
import { errorHandler, notFound } from './middleware/errorMiddleware'
import cors from 'cors'
import chatRoutes from './router/chatRoutes'
doenv.config()
connectDB();
const PORT=process.env.PORT||1000

const server=express()

server.use(express.json())
server.use(cors())   


server.use('/api/user',userRoutes)
server.use('/api/chat',chatRoutes)

server.use(notFound)
server.use(errorHandler)



server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})