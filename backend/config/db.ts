import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(process.env.MONGO_URI||"")
        console.log("Mongodb has connected successfully")
    } catch (error) {
        console.log("error",error)
        process.exit();
    }
}

export default connectDB;