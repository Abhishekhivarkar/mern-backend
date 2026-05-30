import BlackListLokenModel from "../models/BlackListToken.model.js"
import SessionModel from "../models/Session.model.js"


import {pool} from "../../../configs/db.config.js"
import type {User} from "../models/User.model.js"

export const register = async(email:string,password:string):Promise<User> =>{
 
    const result = await pool.query<User>(
     `
     INSERT INTO users(email,password) VALUES($1, $2)
     RETURNING *
     `,
     [email,password]
     );
     return result.rows[0]
}

export const findUserByEmail = async(
 {email}:{email:string}
 ):Promise<User | null > =>{
    const result = await pool.query<User>(
     ` 
     SELECT * FROM users WHERE email = $1 LIMIT 1
     `,
     [email]
     )
     return result.rows[0] ?? null
}
/*
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

*/