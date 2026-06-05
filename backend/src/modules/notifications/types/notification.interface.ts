import mongoose from "mongoose"
import {Document} from "mongoose"
export interface INotification extends Document{
    user:mongoose.Types.ObjectId,
    type:string,
    title:string,
    message:string,
    metaData:object,
    isRead: boolean
}