import { NextFunction,Request,Response} from "express";
import { z} from "zod";
export const validate = (schema:{
    body?:z.ZodType,
    params?:z.ZodType,
    query?:z.ZodType
}) =>async (req:Request,res:Response,next:NextFunction) =>{
    try{
        if(schema.body){
            req.body = await schema.body.parseAsync(req.body)
        }
        if(schema.params){
            req.params =await schema.params.parseAsync(req.params)
        }
        if(schema.query){
            req.query = await schema.query.parseAsync(req.query)
        }

        return next()
    }catch(error){
        return next(error)
    }
}