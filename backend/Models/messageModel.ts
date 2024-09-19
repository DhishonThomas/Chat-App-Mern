import mongoose from "mongoose";
import { UserSchema } from "./userModel";
import { ChatDocument } from "./chatModel";

export interface MessageDocument extends Document{
    sender:UserSchema
    content:string
    chat:ChatDocument

}


const messageModel=new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"}
},
{
    timestamps:true,
}
)

const Message=mongoose.model("Message",messageModel)

export default Message