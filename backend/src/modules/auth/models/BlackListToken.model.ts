// import mongoose from "mongoose";

// import { Model } from "mongoose";
// import { IBlackListToken } from "../types/auth.interface.js";
// export const blackListLokenSchema= new mongoose.Schema<IBlackListToken>({
//     token:{
//         required:true,
//         type:String
//     }
// },{timestamps:true}) 


// const BlackListLokenModel:Model<IBlackListToken> = mongoose.model<IBlackListToken>("BlackListToken",blackListLokenSchema)

// export default BlackListLokenModel

export interface BlackListLoken{
    access_token:string
    created_at:Date
    updated_at:Date
}