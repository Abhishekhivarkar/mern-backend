import NotificationModel from "../models/notification.model.js"

export const createNotification = async(user:string,type:string,title:string,message:string,metaData:Object) =>{
    return await NotificationModel.create({
        user,
        type:type,
        title,
        message,
        metaData,
        isRead:false
    })
}

export const getUnreadNotifications = async(user:string) =>{
    return await NotificationModel.find({

    
        user,
        idRead:false
    }
    ).sort({createdAt:-1})
}


export const markNotificationRead = async(user:string) =>{
    return await NotificationModel.updateMany(
        {
            user:user,
            isRead:false
        },{
            isRead:true
        }
    )
}