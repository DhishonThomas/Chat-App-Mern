import bcrpt from 'bcryptjs'




export async function hashedPssword(password:string) {
    const salt=await bcrpt.genSalt(10)
    const hashedPssword=await bcrpt.hash(password,salt)
    return hashedPssword
}


