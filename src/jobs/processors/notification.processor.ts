import { createNotification } from "../../modules/notifications/repositories/notification.repository.js";
import { emitToUser } from "../../sockets/socket.helper.js";

interface SendNotificationOptions{
 userId:string
 event:string
 payload:{
  noteId?:string
  title?:string
  message:string
 }
}
console.log("send notification processor run ")
export const sendNotificationProcessor =
async({

userId,

event,

payload

}:SendNotificationOptions)=>{
console.log("create notification run ")
await createNotification(
    userId,
    event,
    payload.title || "Notification",
    payload.message,
    payload
)
await emitToUser(
userId,
event,
payload
)

}