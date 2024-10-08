import Chat from '../Models/chatModel';
import User from '../Models/userModel';
import express, { NextFunction,Request,Response } from 'express'
import expressAsyncHandler from "express-async-handler";

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

const createGroupChat = expressAsyncHandler(async (req, res) => {
  console.log(req.body.users,req.body.name)
  if (!req.body.users || !req.body.name) {
     res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users)[0].split(',');
console.log(users.length)
  if (users.length < 2) {
     res
      .status(400)
      .send("More than 2 users are required to form a group chat");
      return
  }

  users.push(req.user._id.toString());
console.log(users)
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id.toString(),
    });
console.log(groupChat)
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error:any) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const removeFromGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;


  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});


const addToGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;


  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

export {accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup}
