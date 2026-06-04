export interface Notification{
    notification_id:string,
    user_id:string,
    notification_type:string,
    notification_name:string,
    notification_message: string,
    meta_data:string,
    is_read:boolean,
    created_at:Date,
    updated_at:Date
}


// import type  {Model} from "mongoose"
// import mongoose from "mongoose"
// import { INotification } from "../types/notification.interface.js"

// export const notificationSchema = new mongoose.Schema<INotification>({
//     user:{
//         type:mongoose.Types.ObjectId,
//         ref:"User",
//         required:true
//     },
//     type:{
//         type:String,
//         required:true
//     },
//     title:{
//         type:String,
//         required:true
//     },
//     message:{
//         type:String,
//         required:true
//     },
//     metaData:{
//         type:Object,
//         default:{}
//     },
//     isRead:{
//         type:Boolean,
//         default:false
//     }

// },{timestamps:true})

// export const NotificationModel:Model<INotification> = mongoose.model<INotification>("Notification",notificationSchema)

// export default NotificationModel


