import { notificationQueue } from "../../jobs/queues/notification.queue.js";

export const sendNoteCreatedNotificationToUser = async(userId:string,payload:{
    noteId:string,
    title:string,
    message:string
}) =>{
    await notificationQueue.add("note-created",{userId:userId,event:"note:created",payload})
}