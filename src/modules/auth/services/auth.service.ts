import {register,findUserByEmail/*,findUserByEmailForLogin,findSessionByIdRepository,createBlackListTokenRepository*/} from "../repositories/auth.repository.js"
import {AppError} from "../../../common/utils/appError.util.js"
import {HTTP_STATUS} from "../../../common/constants/httpStatus.constant.js"
import {MESSAGES} from "../../../common/constants/messages.constant.js"
import bcryptjs from "bcryptjs"
import { verifyAccessToken, verifyRefreshToken } from "../../../common/helpers/token.helper.js"
import crypto from "node:crypto"
import { sendRegisterMail } from "../../../common/services/mail.service.js"
import SessionModel from "../models/Session.model.js"
import { logger } from "../../../common/services/logger.service.js"
import type{ RegisterDto } from "../validations/auth.validation.js"
export const registerService = async(body:RegisterDto) =>{
 console.log(body.email,body.password)
    const normalizedEmail = body.email.trim().toLowerCase()
 const isExists = await findUserByEmail({email:normalizedEmail})
 
 if(isExists){

    logger.warn({
        event:"REGISTER_DUPLICATE_EMAIL",
        email:normalizedEmail
    })
  throw new AppError(MESSAGES.AUTH.ALREADY_REGISTERED,HTTP_STATUS.CONFLICT)
 }
 const hashPassword =await bcryptjs.hash(body.password,10)
 
 const user = await register(normalizedEmail,hashPassword)

 logger.info({
    message:"USER_REGISTERED",
    userId:user.id.toString(),
    email:user.email
 })
  sendRegisterMail(user.email)
.catch(error=>{
    logger.error({
        event:"REGISTER_MAIL_FAILED",
        userId:user.id.toString(),
        error
    })
})
 return user
}

export const loginService = async(body:LoginDto) =>{
    const normalizedEmail = body.email.trim().toLowerCase()
    const user = await findUserByEmailForLogin({email:normalizedEmail})
    
    if(!user){
     logger.warn({
      message:"USER_NOT_FOUND",
      email:user.normalizedEmail
     })
        throw new AppError(MESSAGES.AUTH.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    const isCorrect =await user.comparePassword(body.password)

    if(!isCorrect){
        logger.warn({
         message:"Incorrect password",
         password:body.password
        })
        throw new AppError(MESSAGES.AUTH.WRONG_CREDENTIALS,HTTP_STATUS.BAD_REQUEST)
    }

    return user

}


export const BlackListTokenService = async (refreshToken:string, accessToken:string) =>{


    if(!refreshToken && !accessToken){
        throw new AppError(MESSAGES.AUTH.TOKEN_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    const decoded = verifyAccessToken(accessToken)
    
    const session = await findSessionByIdRepository(decoded.sessionId)

    if(!session){
        throw new AppError(MESSAGES.AUTH.SESSION_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    session.isRevoked = true
    await session.save()

    await createBlackListTokenRepository(accessToken)
    return true

}

export const refreshTokenService = async(token:string)=>{
    if(!token){
        throw new AppError(MESSAGES.AUTH.TOKEN_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    const decoded = verifyRefreshToken(token)

    const refreshTokenHash = crypto.createHash("sha256").update(token).digest("hex")

    const session = await findSessionByIdRepository(decoded.sessionId)

    
    if(!session){
        throw new AppError(MESSAGES.AUTH.SESSION_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    if(session.isRevoked){
        throw new AppError(
            MESSAGES.AUTH.SESSION_REVOKED,HTTP_STATUS.UNAUTHORIZED
        )
    }

    if(session.expiresAt < new Date()){
        throw new AppError(
            MESSAGES.AUTH.SESSION_EXPIRED,HTTP_STATUS.UNAUTHORIZED
        )
    }
    if(session.refreshTokenHash !== refreshTokenHash){

        await SessionModel.updateMany({
            user:decoded.id
        },
        {
            isRevoked:true
        }
    )
        throw new AppError(MESSAGES.AUTH.REFRESH_TOKEN_REUSE,HTTP_STATUS.UNAUTHORIZED)
    }

    return {
        userId:decoded.id,
        session
        
    }
}