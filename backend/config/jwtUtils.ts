import jwt from "jsonwebtoken";

const SECRET_KEY=process.env.JWT_SECRET || "panax_jwt_screct_key"

export const generateToken=(payload:object):string=>{
    return jwt.sign(payload,SECRET_KEY,{expiresIn:'1h'})
}


export const verifyToken=(token:string):any=>{
    try{
        return jwt.verify(token,SECRET_KEY)
    }catch(error){
        throw new Error("Bad token")
    }
}