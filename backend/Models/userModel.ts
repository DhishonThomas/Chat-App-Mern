import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

export interface UserSchema extends Document{
    name:string,
    email:string,
    password:string,
    pic:string,
    isAdmin:boolean,
    matchPassword(enteredPassword:string):Promise<boolean>

}

const userSchema=new mongoose.Schema<UserSchema>({
     name:{type:String,required:true},
     email:{type:String,required:true,unique:true},
     password:{type:String,required:true},
     pic:{
        type:String,
        required:true,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
          },
},
{
    timestamps:true
}
)

userSchema.methods.matchPassword=async function (enteredPassword:string){
    return await bcrypt.compare(enteredPassword,this.password)
}



const User=mongoose.model("User",userSchema)

export default User