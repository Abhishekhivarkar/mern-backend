import rateLimit from "express-rate-limit"

import { HTTP_STATUS } from "../constants/httpStatus.constant.js"
import { MESSAGES } from "../constants/messages.constant.js"

export const rateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,

    max:100,

    statusCode: HTTP_STATUS.TO_MANY_REQUESTS,

    message:{
        success:false,
        MESSAGE.LIMITER.TO_MANY_REQUESTS
    }
})