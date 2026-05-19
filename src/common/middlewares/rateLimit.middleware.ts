import rateLimit from "express-rate-limit"

import { HTTP_STATUS } from "../constants/httpStatus.constant.js"
import { MESSAGES } from "../constants/messages.constant.js"
import  { ipKeyGenerator } from "express-rate-limit"
export const rateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,

    max:100,

    statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,

    message:{
        success:false,
        messsage:MESSAGES.LIMITER.TOO_MANY_REQUESTS
    },

    standardHeaders:true,
    legacyHeaders:false
})

export const authLimitMiddleware = rateLimit({
    windowMs:10 * 60 * 1000,

    max:5,

    keyGenerator:(req)=>{
        return `${ipKeyGenerator(req.ip || "")}-${
            req.body.email || "unknown"
        }`
    },

    statusCode:HTTP_STATUS.TOO_MANY_REQUESTS,
    message:{
        success:false,
        message:MESSAGES.LIMITER.TOO_MANY_REQUESTS
    },
    standardHeaders:true,
    legacyHeaders:false
})