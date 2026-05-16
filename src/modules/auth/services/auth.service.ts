import {register,findUserByEmail,findUserByEmailForLogin} from "../repositories/auth.repository.js"
import {AppError} from "../../../utils/appError.util.js"


export const registerService = async(body:{
 email:string,
 password:string
}) =>{
 
 const isExists = await findUserByEmail({email:body.email})
 
 if(isExists){
  throw new AppError("user already register",401)
 }
 const user = await register(body)
 return user
}

export const loginService = async(email:string,password:string) =>{

    const user = await findUserByEmailForLogin({email})
    
    if(!user){
        throw new AppError("user not found, please register",404)
    }

    const isCorrect = user.comparePassword(password)

    if(!isCorrect){
        throw new AppError("Incorrect password",401)
    }

    return user

}