import { getIo } from "./socket.server.js";

export const emitToUser =(
    userId:string,
    event:string,
    payload:{       // noteId, title, message
        noteId?:string,
        title?:string,
        message:string
    }   
) =>{
    const io = getIo()

    io.to(`user:${userId}`).emit(
        event,
        payload
    )
}