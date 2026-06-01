import type { Request, Response } from "express"

// async handler import 
import { asyncHandler } from "../../../common/utils/asyncHandler.util.js"

// service imports
import { registerService,loginService,logoutService,refreshTokenService} from "../services/auth.service.js"


// import SessionModel from "../models/Session.model.js"


import crypto, { randomUUID } from "crypto"
import { redisClient } from "../../../configs/redis.config.js"


import {HTTP_STATUS} from "../../../common/constants/httpStatus.constant.js"
import {MESSAGES} from "../../../common/constants/messages.constant.js"
import {removeRefreshTokenCookie, setRefreshTokenCookie} from "../../../common/helpers/cookie.helper.js"
import {generateRefreshToken,generateAccessToken} from "../../../common/helpers/token.helper.js"
import { AuthDto } from "../types/dtos/auth.dto.js"
import { RegisterResponseDto } from "../types/dtos/register.response.dto.js"
import { LoginResponseDto } from "../types/dtos/login.response.dto.js"
import { LogoutDto } from "../types/dtos/logout.dto.js"
import { LogoutResponseDto } from "../types/dtos/logout.response.dto.js"
import { logger } from "../../../common/services/logger.service.js"
import type{ RegisterDto,LoginDto } from "../validations/auth.validation.js"
import { pool } from "../../../configs/db.config.js"



// register
export const register = asyncHandler(
  async (
    req: Request<
      {},
      RegisterResponseDto,
      RegisterDto
    >,

    res: Response<RegisterResponseDto>
  ) => {
    logger.info({
      message:"Register request received",
      email: req.body.email,
      ip: req.ip
    })
    const user = await registerService(req.body)

    logger.info({
      message:"User registered successsfully",
      userId:req.userId
    })
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
      data: user.user_id,
    })
  }
)


//login
export const login = asyncHandler(async(req:Request<{},LoginResponseDto,LoginDto>,res:Response<LoginResponseDto>)=>{

  logger.info({
    message:"Login request received",
    email:req.body.email,
    ip:req.ip
  })

  const user = await loginService(req.body)

  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  )

 const sessionId = randomUUID()


  const refreshToken = generateRefreshToken({id:user._id,sessionId})
  
  const hashRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex")


  await pool.query(
    `
    INSERT INTO sessions(

    session_id,
    user_id,
    refresh_token_hash,
    ip,
    user_agent,
    expires_at

    )VALUES(
    $1,$2,$3,$4,$5,$6
    )
    `,
    [
      sessionId,
      user.user_id,
      hashRefreshToken,
      req.ip,
      req.headers["user-agent"] || "",
      expiresAt
    ]
  )

  await redisClient.set(
    `refreshToken:${user.user_id}`,
    hashRefreshToken,
  
      "EX", 60 * 60 * 24 * 7
    
  )
  
  setRefreshTokenCookie(refreshToken,res)

  const accessToken = generateAccessToken({
   id:user.user_id,sessionId
  })

  logger.info({
    message:"User loggedin successfully",
    userId:req.userId
  })
  return res.status(HTTP_STATUS.OK).json({
    success:true,
    message:MESSAGES.AUTH.LOGIN_SUCCESS,
    data:user.id,
    accessToken
  })
})




export const logout = asyncHandler(async(req:LogoutDto,res:Response<LogoutResponseDto>)=>{
  const refreshToken = req.cookies?.refreshToken
  const accessToken = req.headers.authorization?.split(" ")[1]

  await logoutService(refreshToken as string,accessToken as string)

   removeRefreshTokenCookie(res)

   return res.status(200).json({
    success:true,
    message:"User logout successfully"
   })

})


export const refreshToken = asyncHandler(async(req,res) =>{
  const refreshToken = req.cookies?.refreshToken

  const token = await refreshTokenService(refreshToken)

  const accessToken =  generateAccessToken(
    {id:token.userId,sessionId:token.session.session_id},
  )

  const newRefreshToken = generateRefreshToken(
    {id:token.userId,sessionId:token.session.session_id}
  )

  const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex")

  await pool.query(
    `
    UPDATE sessions
    SET refresh_token_hash = $1
    WHERE session_id = $2
    `,
    [
      newRefreshTokenHash,
      token.session.session_id
    ]
  )

  setRefreshTokenCookie(newRefreshToken,res)

  return res.status(200).json({
    success:true,
    accessToken:accessToken
  })
})