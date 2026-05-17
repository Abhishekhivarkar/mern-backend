import type {Request,Response,NextFuntion} from "express"
import {config} from "../../configs/env.config.js"
import UserModel from "../../modules/auth/models/User.model.js"
import jwt from "jsonwebtoken"


export const authMiddleware =async (req:Request,res:Response,next:NextFunction) =>{
 try{
 const token = req.headers.authorization?.split(" ")[1]
 
 if(!token){
  return res.status(403).json({
   success:false,
   message:"Invalid or expired token"
  })
 }
 
 const decoded = jwt.verify(token,config.JWT_SECRET)
 
 const user = await UserModel.findById(decoded.id)
 
 if(!user){
  return res.status(403).json({
   success:false,
   message:"Invalid token"
  })
 }
 
 req.userId = decoded.id
 next()
 }catch(err){
  console.log("Auth middleware error : ",err)
 }
}