import asyncHandler from 'express-async-handler'
import User from '../Models/userModel'
import { generateToken } from '../config/jwtUtils'
import { hashedPssword } from '../config/passwordManager'

const registerUser=asyncHandler(async(req,res)=>{
 const{name,email,password,pic}=req.body   


 if(!name||!email||!password){
    res.status(400)
    throw new Error("Please Enter all the Feilds")
 }

 const userExists=await User.findOne({email})

 if(userExists){
    res.status(400)
    throw new Error("User already exists")
 }
 const passwordHash=await hashedPssword(password)


 const user=await User.create({
    name,
    email,
    passwordHash,
    pic,
 })

 if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)
    })
 }else{
    res.status(400)
    throw new Error("Failed to Create the User")
 }
})


const authUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body

    const user=await User.findOne({email});

    if(user&&(await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic

        })
    }
})

export {registerUser,authUser}