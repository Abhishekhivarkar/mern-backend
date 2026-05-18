import type {Request,Response,NextFuntion} from "express"
import {config} from "../../configs/env.config.js"
import UserModel from "../../modules/auth/models/User.model.js"
import jwt from "jsonwebtoken"
import {verifyAccessToken} from "../helpers/token.helper.js"
import {HTTP_STATUS} from "../constants/httpStatus.constant.js"
import {MESSAGES} from "../constants/messages.constant.js"
export const authMiddleware =async (req:Request,res:Response,next:NextFunction) =>{
 try{
 const token = req.headers.authorization?.split(" ")[1]
 
 if(!token){
  return res.status(HTTP_STATUS.FORBIDDEN).json({
   success:false,
   message:MESSAGES.AUTH.FORBIDDEN
  })
 }
 
 const decoded = verifyAccessToken(token)
 
 const user = await UserModel.findById(decoded.id)
 
 if(!user){
  return res.status(HTTP_STATUS.FORBIDDEN).json({
   success:false,
   message:MESSAGES.AUTH.FORBIDDEN
  })
 }
 
 req.userId = decoded.id
 next()
 }catch(err){
  console.log("Auth middleware error : ",err)
 }
}