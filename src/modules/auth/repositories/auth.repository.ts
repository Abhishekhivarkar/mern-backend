import UserModel from "../Models/User.model.js"
export const register = async(data) =>{
return await UserModel.create(data)
}