import type {Request,Response,NextFunction} from "express"
import mongoose from "mongoose"
import {AppError} from "../utils/appError.util.js"
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken"
// for wrong monhoDB _id
const handleCastErrorDB = (err:mongoose.Error.CastError) =>{
 return new AppError(
  `Invalid ${err.path} : ${err.value}`,
  400
  )
}

// for duplicate data eg. email:example@gnail.com
const handleDuplicateFieldsDB = (err:any) =>{
 const field = Object.keys(err.keyValue)[0]
 
 const value = err.keyValue[field]
 
 return new AppError(`${field} ${value} already exists`),400
}


//for validations like 
const handleVaildatioErrorDB = (err:mongoose.Error.ValidationError) =>{
 
 const errors = Object.values(err.errors).map((el)=> el.message)
 
 return new AppError(
  errora.join(", "),400
  )
}

const handleJWTError = () =>{
 return new AppError(
  "Invalid token, please login again",401
  )
}

const handleJWTExpiredError = () =>{
 return new AppError(
  "Your token has expired, please login again ",401
  )
}

const sendDevError = (
 err:any,
 res:Response
 )=>{
  res.status(err.statusCode).json({
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
  ) =>{
   if(err.isOperation){
    return res.status(err.statusCode).json({
     success:false,
     status:err.status,
     message:err.message
    })
   }
   console.error("Unknown Error : ",err)
   
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
   ) =>{
   err.statusCode = err.statusCode || 500
   
   err.status = err.status || "error"
   
   if(process.env.NODE_ENV === "devlopment"){
    sendDevError(err,res)
   }else if(process.env.NODE_ENV === "production"){
    let error = {
     ...err,
     message = err.message
    }
    
    if(err instanceof mongoose.Error.CastError){
     error = handleCastErrorDB(err)
    }
    
    if(err.code === 11000){
     error = handleDuplicateFieldsDB(err)
    }
   
   
   if(err instanceof mongoose.mongoose.Error.ValidationError){
    error = handleVaildatioErrorDB(err)
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