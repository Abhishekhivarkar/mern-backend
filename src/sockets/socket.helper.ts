import { redisClient } from "../configs/redis.config.js";



export const emitToUser =async(
    user_id:string,
    event:string,
    payload:{       // note_id, title, message
        note_id?:string,
        title?:string,
        message:string
    }   
) =>{
    console.log("publish")
  await redisClient.publish(
    "socket-events",
    JSON.stringify({
        room:`user:${user_id}`,
        event,
        payload
    })
  )
}

