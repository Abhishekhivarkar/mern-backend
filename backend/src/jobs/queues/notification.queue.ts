import {Queue} from "bullmq"
import { redisClient } from "../../configs/redis.config.js"



export interface NotificationJobData{
    user_id:string,
    type:string,
    event:string,
    payload:{
        note_id?:string,
        title?:string,
        message:string
    }
}

export const notificationQueue = new Queue<NotificationJobData>("notificationQueue",{
    connection:redisClient as any,
    defaultJobOptions:{
        attempts:3,
        backoff:{
            type:"exponential",
            delay:5000
        },
        removeOnComplete:100,
        removeOnFail:50
    }
}
)