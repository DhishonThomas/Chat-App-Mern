import Chat from '../Models/chatModel';
import User from '../Models/userModel';
import express, { NextFunction,Request,Response } from 'express'
import expressAsyncHandler from "express-async-handler";

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = expressAsyncHandler(async (req:Request,res:Response):Promise<void> => {
  const { userId } = req.body;
console.log(userId)
  if (!userId) {
    console.log("UserId param not sent with request");
     res.sendStatus(400);
  }
console.log("reached ",userId)
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");


  isChat = await Chat.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  console.log("isChat",isChat)

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error:any) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = expressAsyncHandler(async (req, res) => {
  try {
   const result=await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })

      console.log(result)
const data=await User.populate(result,{path:"latestMessage.sender",
    select:"name pic email",
})
  
res.status(200).send(data);
  } catch (error:any) {
    res.status(400);
    throw new Error(error.message);
  }
});


export {accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup}
