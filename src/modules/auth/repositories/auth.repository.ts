import UserModel from "../models/User.model.js"

export const register = async(data) =>{
    return await UserModel.create(data)
}

export const findUserByEmail = async({email}) =>{
 return await UserModel.findOne({email})
}