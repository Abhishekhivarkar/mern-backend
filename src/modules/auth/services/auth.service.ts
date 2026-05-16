import {register,findUserByEmail} from "../repositories/auth.repository.js"
import {AppError} from "../../../utils/appError.util.js"
export const registerService = async(body:{
 email:string,
 password:string
}) =>{
 
 const isExists = await findUserByEmail({Email:body.email})
 
 if(isExists){
  throw new AppError("user already register",401)
 }
 const user = await register(body)
 return user
}