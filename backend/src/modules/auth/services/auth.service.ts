import {register,findUserByEmail,findSessionByIdRepository,createBlackListTokenRepository,/*,findUserByEmailForLogin,*/
findUserByEmailForLogin} from "../repositories/auth.repository.js"
import {AppError} from "../../../common/utils/appError.util.js"
import {HTTP_STATUS} from "../../../common/constants/httpStatus.constant.js"
import {MESSAGES} from "../../../common/constants/messages.constant.js"
import bcryptjs from "bcryptjs"
import { verifyAccessToken, verifyRefreshToken } from "../../../common/helpers/token.helper.js"
import crypto from "node:crypto"
import { sendRegisterMail } from "../../../common/services/mail.service.js"

import { logger } from "../../../common/services/logger.service.js"
import type{ LoginDto, RegisterDto } from "../validations/auth.validation.js"
import { pool } from "../../../configs/db.config.js"


export const registerService = async(body:RegisterDto) =>{
    const client = await pool.connect()

    try{
       await client.query("BEGIN")
    
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
 
 const user = await register(normalizedEmail,hashPassword,client)

    await client.query("COMMIT")
 logger.info({
    message:"USER_REGISTERED",
    user_id:user.user_id.toString(),
    email:user.email
 })
  sendRegisterMail(user.email)
  
.catch(error=>{
    logger.error({
        event:"REGISTER_MAIL_FAILED",
        user_id:user.user_id.toString(),
        error
    })
})

  return user

}catch(err){
    await client.query("ROLLBACK")
    throw err
}finally{       
    await client.release()
}
}

export const loginService = async(body:LoginDto) =>{
    const normalizedEmail = body.email.trim().toLowerCase()

    const user = await findUserByEmailForLogin({email:normalizedEmail})
    
    if(!user){
     logger.warn({
      message:"USER_NOT_FOUND",
      email:normalizedEmail
     })
        throw new AppError(MESSAGES.AUTH.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    const comparePassword =await bcryptjs.compare(body.password,user.password)


    if(!comparePassword){
        logger.warn({
         message:"Incorrect password",
         password:body.password
        })
        throw new AppError(MESSAGES.AUTH.WRONG_CREDENTIALS,HTTP_STATUS.BAD_REQUEST)
    }

    return user

}


export const logoutService = async (refreshToken:string, accessToken:string) =>{


    if(!refreshToken && !accessToken){
        throw new AppError(MESSAGES.AUTH.TOKEN_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    const decoded = verifyAccessToken(accessToken)
    
    const session = await findSessionByIdRepository(decoded.sessionId)

    if(!session){
        throw new AppError(MESSAGES.AUTH.SESSION_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    await pool.query(
        `
        UPDATE sessions
        SET is_revoked = TRUE
        WHERE session_id = $1
        `,
        [
            decoded.sessionId
        ]
    )

    await createBlackListTokenRepository(accessToken)
    return true

}

export const refreshTokenService = async(token?:string)=>{
    if(!token){
        throw new AppError(MESSAGES.AUTH.TOKEN_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    const decoded = verifyRefreshToken(token)

    const refreshTokenHash = crypto.createHash("sha256").update(token).digest("hex")

    const session = await findSessionByIdRepository(decoded.sessionId)

    
    if(!session){
        throw new AppError(MESSAGES.AUTH.SESSION_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    if(session.is_revoked){
        throw new AppError(
            MESSAGES.AUTH.SESSION_REVOKED,HTTP_STATUS.UNAUTHORIZED
        )
    }

    if(session.expires_at < new Date()){
        throw new AppError(
            MESSAGES.AUTH.SESSION_EXPIRED,HTTP_STATUS.UNAUTHORIZED
        )
    }
    const old_value = session
    if(session.refresh_token_hash !== refreshTokenHash){

        await pool.query(
            `
            UPDATE sessions 
            SET is_revoked = TRUE,
            updated_at = CURRENT_TIMESTAMP
            WHERE user_id = $1
            `,
            [
                decoded.id
            ]
        )
        throw new AppError(MESSAGES.AUTH.REFRESH_TOKEN_REUSE,HTTP_STATUS.UNAUTHORIZED)
    }

    
    return {
        user_id:decoded.id,
        session,
        old_value
        
    }
}