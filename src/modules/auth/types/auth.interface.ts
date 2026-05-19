import type mongoose from "mongoose";
import type {Document} from "mongoose"
export interface IUser extends Document{
 email:string;
 password:string;

 createdAt:Date;
 updatedAt:Date;

 comparePassword(enteredPassword:string):Promise<boolean>
}

export interface ISession extends Document{
    user:mongoose.Types.ObjectId,
    refreshTokenHash:string,
    ip:string,
    userAgent:string,
    isRevoked:boolean,
    
    createdAt:Date,
    updatedAt:Date,
    expiresAt:Date,
}

export interface IBlackListToken extends Document{
    token:string,
    createdAt:Date,
    updatedAt:Date
}