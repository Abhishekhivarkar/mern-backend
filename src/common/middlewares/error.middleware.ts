import type {
 Request,
 Response,
 NextFunction
} from "express"

import mongoose from "mongoose"

import {
 JsonWebTokenError,
 TokenExpiredError
} from "jsonwebtoken"

import { AppError }
from "../utils/appError.util.js"
import 
const handleCastErrorDB = (
 err:mongoose.Error.CastError
)=>{
 return new AppError(
  `Invalid ${err.path}: ${err.value}`,
  400
 )
}

const handleDuplicateFieldsDB = (
 err:any
)=>{
 const field = Object.keys(
  err.keyValue
 )[0]

 const value = err.keyValue[field]

 return new AppError(
  `${field} ${value} already exists`,
  400
 )
}

const handleValidationErrorDB = (
 err:mongoose.Error.ValidationError
)=>{
 const errors = Object
  .values(err.errors)
  .map((el)=>el.message)

 return new AppError(
  errors.join(", "),
  400
 )
}

const handleJWTError = ()=>{
 return new AppError(
  "Invalid token, please login again",
  401
 )
}

const handleJWTExpiredError = ()=>{
 return new AppError(
  "Your token has expired, please login again",
  401
 )
}

const sendDevError = (
 err:any,
 res:Response
)=>{
 return res.status(err.statusCode).json({
  success:false,
  status:err.status,
  message:err.message,
  stack:err.stack,
  error:err
 })
}

const sendProdError = (
 err:any,
 res:Response
)=>{

 if(err.isOperational){

  return res.status(err.statusCode).json({
   success:false,
   status:err.status,
   message:err.message
  })
 }

 console.error("Unknown Error:",err)

 return res.status(500).json({
  success:false,
  status:"error",
  message:"Something went wrong"
 })
}

export const errorMiddleware = (
 err:any,
 req:Request,
 res:Response,
 next:NextFunction
)=>{

 err.statusCode =
  err.statusCode || 500

 err.status =
  err.status || "error"

 if(process.env.NODE_ENV === "development"){

  sendDevError(err,res)

 }else if(
  process.env.NODE_ENV === "production"
 ){

  let error = err

  if(
   err instanceof mongoose.Error.CastError
  ){
   error = handleCastErrorDB(err)
  }

  if(err.code === 11000){
   error = handleDuplicateFieldsDB(err)
  }

  if(
   err instanceof mongoose.Error.ValidationError
  ){
   error = handleValidationErrorDB(err)
  }

  if(err instanceof JsonWebTokenError){
   error = handleJWTError()
  }

  if(err instanceof TokenExpiredError){
   error = handleJWTExpiredError()
  }

  sendProdError(error,res)
 }
}