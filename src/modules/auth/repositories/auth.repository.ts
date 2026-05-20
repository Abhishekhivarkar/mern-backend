import BlackListLokenModel from "../models/BlackListToken.model.js"
import SessionModel from "../models/Session.model.js"
import UserModel from "../models/User.model.js"

export const register = async(email:string,password:string) =>{
    return await UserModel.create({
        email,password
    })
}

export const findUserByEmail = async({email}:{email:string}) =>{
 return await UserModel.findOne({email})
}

export const findUserByEmailForLogin = async({email}:{email:string}) =>{
 return await UserModel.findOne({email}).select("+password")
}

export const findSessionByIdRepository = async(sessionId:string) =>{
    return await SessionModel.findById(sessionId)
}

export const createBlackListTokenRepository = async(accessToken:string) =>{
    return await BlackListLokenModel.create({token:accessToken})
}

export const findSessionByRefreshTokenHash = async(refreshTokenHash:string) =>{
    return await SessionModel.findOne({
        refreshTokenHash:refreshTokenHash
    })
}

