import mongoose from "mongoose"
import type {ISession} from "../types/auth.interface.js"
import type { Model } from "mongoose"


const sessionSchema = new mongoose.Schema<ISession>({
    user:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    refreshTokenHash:{
        type:String,
        required:true
    },
    ip:{
        
        type:String,
        required:true
    }
        ,
    userAgent:{
        type:String,
        required:true
    },
    isRevoked:{
        type:Boolean,
        default:false
    }
})

const SessionModel:Model<ISession> = mongoose.model("Session",sessionSchema)

export default SessionModel