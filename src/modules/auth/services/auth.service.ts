import {register,findUserByEmail,findUserByEmailForLogin,findSessionByIdRepository,createBlackListTokenRepository} from "../repositories/auth.repository.js"
import {AppError} from "../../../common/utils/appError.util.js"
import {HTTP_STATUS} from "../../../common/constants/httpStatus.constant.js"
import {MESSAGES} from "../../../common/constants/messages.constant.js"
import { verifyAccessToken } from "../../../common/helpers/token.helper.js"

export const registerService = async(body:{
 email:string,
 password:string
}) =>{
 
 const isExists = await findUserByEmail({email:body.email})
 
 if(isExists){
  throw new AppError(MESSAGES.AUTH.ALREADY_REGISTERED,HTTP_STATUS.CONFLICT)
 }
 const user = await register(body)
 return user
}

export const loginService = async(email:string,password:string) =>{

    const user = await findUserByEmailForLogin({email})
    
    if(!user){
        throw new AppError(MESSAGES.AUTH.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    const isCorrect =await user.comparePassword(password)

    if(!isCorrect){
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

    const blackListToken = await createBlackListTokenRepository(accessToken)


}