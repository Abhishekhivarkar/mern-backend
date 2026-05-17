export class AppError extends Error{
 public statusCode:number
 public isOperation:boolean
 public status:string
 constructor(message:string,statusCode:number){
  
  super(message)
  this.statusCode = statusCode
  this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
  
  this.isOperationl = true
  Error.captureStackTrace(this,this.constructor)
 }
}