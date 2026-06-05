import { createNotification } from "../../modules/notifications/repositories/notification.repository.js";
import { emitToUser } from "../../sockets/socket.helper.js";

interface SendNotificationOptions{
 user_id:string
 type:string
 event:string
 payload:{
  note_id?:string
  title?:string
  message:string
 }
}
console.log("send notification processor run ")
export const sendNotificationProcessor =
async({

user_id,
type,
event,

payload

}:SendNotificationOptions)=>{
console.log("create notification run ")
await createNotification(
    user_id,
    type,
    payload.title || "Notification",
    payload.message,
    payload
)
await emitToUser(
user_id,
event,
payload
)

}