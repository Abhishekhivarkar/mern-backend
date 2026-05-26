import { notificationQueue } from "../../jobs/queues/notification.queue.js";

export const sendNoteCreatedNotificationToUser = async(userId:string,payload:{
    noteId:string,
    title:string,
    message:string
}) =>{
    await notificationQueue.add("note-created",{userId:userId,event:"note:created",payload})
}

export const sendNoteUpdatedNotificationToUser = async(userId:string,payload:{
    title:string | undefined,noteId:string,message:string
}) =>{
    await notificationQueue.add("note-update",{
        userId,event:"note:update",payload
    })
}