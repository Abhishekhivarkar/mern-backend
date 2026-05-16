import UserModel from "../models/User.model.js"
import type {IUser} from "../types/interfaces/auth.interface.js"
export const register = async(data:IUser) =>{
    return await UserModel.create(data)
}

export const findUserByEmail = async({email}:{email:string}) =>{
 return await UserModel.findOne({email})
}

export const findUserByEmailForLogin = async({email}:{email:string}) =>{
 return await UserModel.findOne({email}).select("+password")
}