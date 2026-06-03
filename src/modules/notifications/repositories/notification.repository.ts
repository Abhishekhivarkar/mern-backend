import NotificationModel from "../models/notification.model.js"


export const getAllNotificatiosnRepository = async() =>{
    return await NotificationModel.find()
}
export const createNotification = async(user:string,type:string,title:string,message:string,metaData:object) =>{
    try{
  const notification = await NotificationModel.create({
        user:user,
        type,
        title,
        message,
        metaData,
        isRead:false
    })

    return notification
    }catch(err){
        console.log(err)
        throw err
    }
  
}

export const getUnreadNotifications = async(user:string) =>{
    return await NotificationModel.find({

    
        user,
        isRead:false
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


export const getUnreadNotificationsRepository = async () =>{
    return await NotificationModel.find({
        isRead:false
    })
}