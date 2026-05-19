import type { Request, Response } from "express"

// async handler import 
import { asyncHandler } from "../../../common/utils/asyncHandler.util.js"

// service imports
import { registerService,loginService,BlackListTokenService,refreshTokenService} from "../services/auth.service.js"


import SessionModel from "../models/Session.model.js"


import crypto from "crypto"
import { redisClient } from "../../../configs/redis.config.js"


import {HTTP_STATUS} from "../../../common/constants/httpStatus.constant.js"
import {MESSAGES} from "../../../common/constants/messages.constant.js"
import {removeRefreshTokenCokie, setRefreshTokenCookie} from "../../../common/helpers/cookie.helper.js"
import {generateRefreshToken,generateAccessToken} from "../../../common/helpers/token.helper.js"
import { AuthDto } from "../types/dtos/auth.dto.js"
import { RegisterResponseDto } from "../types/dtos/register.response.dto.js"
import { LoginResponseDto } from "../types/dtos/login.response.dto.js"
import { LogoutDto } from "../types/dtos/logout.dto.js"
import { LogoutResponseDto } from "../types/dtos/logout.response.dto.js"



// register
export const register = asyncHandler(
  async (
    req: Request<
      {},
      RegisterResponseDto,
      AuthDto
    >,

    res: Response<RegisterResponseDto>
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
export const login = asyncHandler(async(req:Request<{},LoginResponseDto,AuthDto>,res:Response<LoginResponseDto>)=>{
  const {email,password} = req.body

  const user = await loginService(email,password)
  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  )
  const session = new SessionModel({
    user:user._id,
    ip:req.ip,
    userAgent:req.headers["user-agent"] || "",
    expiresAt
  })


  const refreshToken = generateRefreshToken({id:user._id.toString(),sessionId:session._id.toString()})
  
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
  
  setRefreshTokenCookie(refreshToken,res)

  const accessToken = generateAccessToken({
   id:user._id.toString(),sessionId:session._id.toString()
  })
  return res.status(HTTP_STATUS.OK).json({
    success:true,
    message:MESSAGES.AUTH.LOGIN_SUCCESS,
    data:user._id.toString(),
    accessToken
  })
})




export const logout = asyncHandler(async(req:LogoutDto,res:Response<LogoutResponseDto>)=>{
  const refreshToken = req.cookies?.refreshToken
  const accessToken = req.headers.authorization?.split(" ")[1]

  await BlackListTokenService(refreshToken as string,accessToken as string)

   removeRefreshTokenCokie(res)

   return res.status(200).json({
    success:true,
    message:"User logout successfully"
   })

})


export const refreshToken = asyncHandler(async(req,res) =>{
  const refreshToken = req.cookies?.refreshToken

  const token = await refreshTokenService(refreshToken)

  const accessToken =  generateAccessToken(
    {id:token.userId.toString(),sessionId:token.session._id.toString()},
  )

  const newRefreshToken = generateRefreshToken(
    {id:token.userId.toString(),sessionId:token.session._id.toString()}
  )

  const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex")


  token.session.refreshTokenHash = newRefreshTokenHash
  await token.session.save()

  setRefreshTokenCookie(newRefreshToken,res)

  return res.status(200).json({
    success:true,
    accessToken:accessToken
  })
})