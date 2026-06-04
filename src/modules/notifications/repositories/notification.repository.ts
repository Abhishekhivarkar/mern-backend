import { pool } from "../../../configs/db.config.js"


export const getAllNotificatiosnRepository = async(user_id:string | undefined) =>{
    const result = await pool.query<Notification>(
        `
        SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC
        `,
        [user_id]
    )
    return result.rows
}

export const createNotification = async(user_id:string,type:string,title:string,message:string,metaData:object) =>{
    await pool.query(
        `
        INSERT INTO notifications(user_id,notification_type,notification_name,notification_message,meta_data) VALUES ($1,$2,$3,$4,$5)
        `,
        [
            user_id,type,title,message,metaData
        ]
    )
  
}

export const getUnreadNotifications = async(user:string) =>{
    const result = await pool.query(
        `
        SELECT * FROM notifications WHERE user_id = $1 AND is_read = FALSE        
        `,
        [user]
    )
    return result.rows
}


// export const markNotificationRead = async(user:string) =>{
//     return await NotificationModel.updateMany(
//         {
//             user:user,
//             isRead:false
//         },{
//             isRead:true
//         }
//     )
// }


export const getUnreadNotificationsRepository = async (user_id:string | undefined) =>{
   const result = await pool.query(
    `
    SELECT * FROM notifications WHERE user_id = $1 AND is_read = FALSE ORDER BY created_at DESC
    `,
    [user_id]
   )

   return result.rows
}