import { redisClient } from "../configs/redis.config.js";


export const emitToUser =async(
    userId:string,
    event:string,
    payload:{       // noteId, title, message
        noteId?:string,
        title?:string,
        message:string
    }   
) =>{
    console.log("publish")
  await redisClient.publish(
    "socket-events",
    JSON.stringify({
        room:`user:${userId}`,
        event,
        payload
    })
  )
}