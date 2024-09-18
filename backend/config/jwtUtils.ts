import jwt from "jsonwebtoken";
import mongoose, { ObjectId } from "mongoose";

const SECRET_KEY=process.env.JWT_SECRET || "panax_jwt_screct_key"

export const generateToken=(payload:object):string=>{
    console.log("payload",payload)
    return jwt.sign(payload,SECRET_KEY,{expiresIn:'1h'})
}


export const verifyToken = (token: string): any => {
    try {
      const decoded = jwt.verify(token, SECRET_KEY); // This is synchronous
      return decoded;
    } catch (error) {
      throw new Error("Bad token");
    }
  };