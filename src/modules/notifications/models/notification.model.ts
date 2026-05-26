import type  {Model} from "mongoose"
import mongoose from "mongoose"
import { INotification } from "../types/notification.interface.js"

export const notificationSchema = new mongoose.Schema<INotification>({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        reuqired:true
    },
    metaData:{
        type:Object,
        default:{}
    },
    isRead:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export const NotificationModel:Model<INotification> = mongoose.model<INotification>("Notification",notificationSchema)

export default NotificationModel