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

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
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

  const refreshToken = jwt.sign(
    {id:user._id.toString()},
    config.REFRESH_TOKEN_SECRET,
    {expiresIn:"7d"}
  )
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
  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:false,
    sameSite:"strict",
    maxAge:7 * 24 * 60 * 60 * 1000
  })

  const accessToken = jwt.sign(
    {id:user._id.toString()},
    config.JWT_SECRET,
    {expiresIn:"600m"}
  )
  return res.status(200).json({
    success:true,
    message:"user login successfully",
    data:user._id.toString(),
    accessToken
  })
})