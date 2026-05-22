
import { emitToUser } from "../../sockets/socket.helper.js";
interface SendNotificationOptions{
    userId:string,
    event:string,
    payload:{
        noteId?:string,
        title?:string,
        message:string
    }
}
export const sendNotificationProcessor = async ({
    userId,
    event,
    payload
}:SendNotificationOptions) =>{
     emitToUser(userId,event,payload)
}