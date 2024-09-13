import mongoose from "mongoose";

const chatModel=new mongoose.Schema(
    {
        chatName:{type:String,trim:true},
        isGroupChat:{type:Boolean,default:false},
        users:[
            {type:mongoose.Schema.ObjectId,
                ref:"Message"
            },
        
        ],
        lastestMessage:{
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


