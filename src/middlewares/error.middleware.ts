import type {Request,Response,NextFunction} from "express"
export const errorMiddleware = (err,req:Request,res:Response,next:NextFunction) =>{
 console.log(err)
 
 statusCode = err.statsuCode || 500
 
 res.status(statusCode).json({
  success:false,
  message:err.message || "Internal server error"
 })
}