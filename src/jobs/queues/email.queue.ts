
import {Queue} from "bullmq"
import { redisClient } from "../../configs/redis.config.js"

export interface EmailJobData{
    to:string,
    subject:string,
    htmlContent:string
}

export const emailQueue = new Queue<EmailJobData>("emailQueue",
    {
    connection:redisClient as any,
    
    defaultJobOptions:{
        attempts:3,
        backoff:{
            type:"exponential",
            delay:5000
        },
            removeOnComplete:100,
            removeOnFail:50
    },
 }
)