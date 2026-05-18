import type { Request, Response } from "express"

// async handler import 
import { asyncHandler } from "../../../common/utils/asyncHandler.util.js"

// service imports
import { registerService,loginService } from "../services/auth.service.js"

// request body type imports 
import type {
  userRegisterReqBodyType,userLoginReqBodyType
} from "../types/requests/auth.request.js"

// response body type imports
import type {
  userRegisterResBodyType,userLoginResBodyType
} from "../types/responses/auth.response.js"
import SessionModel from "../models/Session.model.js"

import jwt from "jsonwebtoken"
import { config } from "../../../configs/env.config.js"
import crypto from "crypto"
import { redisClient } from "../../../configs/redis.config.js"
import {REFRESH_COOKIE_NAME,REFRESH_COOKIE_OPTIONS} from "../../../common/constants/cookie.constant.js"

import {HTTP_STATUS} from "../../../common/constants/httpStatus.constant.js"
import {MESSAGES} from "../../../common/constants/messages.constant.js"
import {setRefreshTokenCookie} from "../../../common/helpers/cookie.helper.js"
import {generateRefreshToken,generateAccessToken} from "../../../common/helpers/token.helper.js"
// register
export const register = asyncHandler(
  async (
    req: Request<
      {},
      userRegisterResBodyType,
      userRegisterReqBodyType
    >,

    res: Response<userRegisterResBodyType>
  ) => {

    const user = await registerService(req.body)

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
      data: user._id.toString(),
    })
  }
)


//login
export const login = asyncHandler(async(req:Request<{},userLoginResBodyType,userLoginReqBodyType>,res:Response<userLoginResBodyType>)=>{
  const {email,password} = req.body

  const user = await loginService(email,password)

  const session = new SessionModel({
    user:user._id,
    ip:req.ip,
    userAgent:req.headers["user-agent"] || ""
  })


  const refreshToken = generateRefreshToken({id:user._id.toString()})
  
  const hashRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex")

  session.refreshTokenHash = hashRefreshToken

  await session.save()

  await redisClient.set(
    `refreshToken:${user._id.toString()}`,
    hashRefreshToken,
    {
      EX: 60 * 60 * 24 * 7
    }
  )
  
  setRefreshTokenCookie(res,refreshToken)

  const accessToken = generateAccessToken({
   id:user._id.toString()
  })
  return res.status(HTTP_STATUS.OK).json({
    success:true,
    message:MESSAGES.AUTH.LOGIN_SUCCESS,
    data:user._id.toString(),
    accessToken
  })
})