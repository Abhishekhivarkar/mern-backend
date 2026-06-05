import { BlackListLoken } from "../models/BlackListToken.model.js"



import {pool} from "../../../configs/db.config.js"
import type {User} from "../models/User.model.js"
import { Session } from "../models/Session.model.js";
import { PoolClient } from "pg";

export const register = async(email:string,password:string,client:PoolClient):Promise<User> =>{
 
    const result = await client.query<User>(
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

export const findUserByEmailForLogin = async({email}:{email:string}):Promise<User>=>{
 const result =await pool.query<User>(
  `
  SELECT * FROM users WHERE email = $1
  LIMIT 1
  
  `,
  [email]
  )
  return result.rows[0] ?? null
}

export const findSessionByIdRepository = async(sessionId:string):Promise<Session> =>{
    const result = await pool.query<Session>(
        `SELECT * FROM sessions WHERE session_id = $1
        LIMIT 1`,
        [sessionId]
    )
    return result.rows[0] ?? null
}

export const createBlackListTokenRepository = async(accessToken:string):Promise<BlackListLoken> =>{
    const result = await pool.query<BlackListLoken>(
        `
        INSERT INTO black_list_token(access_token) VALUES ($1)
        RETURNING *
        `,
        [accessToken]
    )

    return result.rows[0]
}

// export const findSessionByRefreshTokenHash = async(refreshTokenHash:string) =>{
//     return await SessionModel.findOne({
//         refreshTokenHash:refreshTokenHash
//     })
// }

