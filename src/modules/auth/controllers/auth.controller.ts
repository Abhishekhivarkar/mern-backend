import {IUser} from "../types/interfaces/user.interface.js"
import UserModel from "../models/User.model.js"
import {userService} from "../services/auth.service.js"
import {userRegisterReqBodyType} from "../types/requests/auth.request.js"
import {userRegisterResBodyType} from "../types/responses/auth.response.js"

export const register = asyncHandler(async(req:Request<{},userRegisterResBodyType,userRegisterReqBodyType>,res:Response<userRegisterResBodyType>))=>{
 
 const user = await registerService(req.body)
 
 return res.status(201).json({
  success:true,
  message:"user registerd successfully",
  data:user._id.toString()
 })
}