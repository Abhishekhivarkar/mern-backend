import { logger } from "../services/logger.service.js";
import { Request,Response,NextFunction } from "express";

export const loggerMiddleware = (req:Request,res:Response,next:NextFunction):void =>{
    const start = Date.now()

  

    res.on("finish",()=>{
          const duration = Date.now() - start

          logger.http(
            `${req.method} ${req.originalUrl}
            STATUS: ${req.statusCode}
            Time: ${duration}ms
            `
          )
    })
    next()
}

