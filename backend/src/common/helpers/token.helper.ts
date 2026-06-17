import jwt from "jsonwebtoken" 
import {config} from "../../configs/env.config.js"

export interface JwtPayloadType{
 id:string,
 sessionId:string
}

export const generateAccessToken =(
 payload:JwtPayloadType
 ) =>{
return jwt.sign(
  payload,
  config.JWT_SECRET,
  {
   expiresIn:"15m"
  }
  )
}

export const generateRefreshToken = (
 payload:JwtPayloadType
 )=>{
  return jwt.sign(
   payload,
   config.REFRESH_TOKEN_SECRET,
   {expiresIn:"7d"}
   )
 }
 
export const verifyAccessToken = (
 token:string
 ):JwtPayloadType =>{
 return jwt.verify(
  token,
  config.JWT_SECRET
  ) as JwtPayloadType
}

export const verifyRefreshToken = (
 token:string
 ):JwtPayloadType=>{
  return jwt.verify(
   token,
   config.REFRESH_TOKEN_SECRET
   ) as JwtPayloadType
 }