
import { Server } from "socket.io"
import http from "http"
import { redisClient } from "../configs/redis.config.js"
import { getSocketAdapter } from "./socket.adapter.js"
import { SOCKET_EVENTS } from "./socket.events.js"
import { getUnreadNotifications } from "../modules/notifications/repositories/notification.repository.js"
let io:Server

export const initSocket = (server:http.Server) =>{
  io = new Server(
    server,
    {
      cors:{
        origin:"*"
      }
    }
    
  )

  io.adapter(getSocketAdapter())

  const subscriber = redisClient.duplicate()

  subscriber.subscribe(
    "socket-events"
  )

  subscriber.on(
    "message",
    (
      channel,
      message
    )=>{
      const data = JSON.parse(message)

      io.to(data.room).emit(data.event,data.payload)
    }
  )

  io.on(SOCKET_EVENTS.CONNECTION,
 (socket)=>{
  socket.on(SOCKET_EVENTS.JOIN,async(userId:string)=>{
    socket.join(`user:${userId}`)

    const unRead = await getUnreadNotifications(
        userId
    )

    for(let notification of unRead){
        socket.emit(notification.type,{
            title:notification.title,
            message:notification.message,
            ...notification.metaData
        })
    }



  })
 }
     
  )
}


export const getIo = () =>{
  if(!io){
    throw new Error("Socket not initilized")
  }
  return io
}

