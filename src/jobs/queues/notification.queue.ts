import {Queue} from "bullmq"
import { redisClient } from "../../configs/redis.config.js"


export interface NotificationJobData{
    userId:string,
    event:string,
    payload:{
        noteId?:string,
        title?:string,
        message:string
    }
}

export const notificationQueue = new Queue<NotificationJobData>("notificationQueue",{
    connection:redisClient,
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