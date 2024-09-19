import mongoose from "mongoose";
import { UserSchema } from "./userModel";
import { MessageDocument } from "./messageModel";

export interface ChatDocument extends Document {
    chatName: string;
    isGroupChat: boolean;
    users: UserSchema[];
    latestMessage?: MessageDocument; 
    groupAdmin?: UserSchema;
  }
  

const chatModel=new mongoose.Schema<ChatDocument>(
    {
        chatName:{type:String,trim:true},
        isGroupChat:{type:Boolean,default:false},
        users:[
            {type:mongoose.Schema.ObjectId,
                ref:"User"
            },
        
        ],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        },
        groupAdmin:{
            type:mongoose.Schema.ObjectId,
             ref:"User"
        },
       
        
    }
    , {
        timestamps:true
    }
)

const Chat=mongoose.model("Chat",chatModel)

export default Chat


