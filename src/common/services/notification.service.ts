import { notificationQueue } from "../../jobs/queues/notification.queue.js";

export const sendNoteCreatedNotificationToUser = async(user_id:string,payload:{
    note_id:string,
    title:string,
    message:string
}) =>{
    await notificationQueue.add("note-created",{user_id:user_id,event:"note:created",payload})
}

export const sendNoteUpdatedNotificationToUser = async(user_id:string,payload:{
    title:string | undefined,note_id:string,message:string
}) =>{
    await notificationQueue.add("note-update",{
        user_id,event:"note:update",payload
    })
}