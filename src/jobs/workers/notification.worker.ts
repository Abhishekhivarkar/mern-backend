import {Worker,Job} from "bullmq"
import { sendNotificationProcessor } from "../processors/notification.processor.js"
import { NotificationJobData } from "../queues/notification.queue.js"
import { redisClient } from "../../configs/redis.config.js"

export const notificationWorker = new Worker("notificationQueue",
    async (job:Job<NotificationJobData>)=>{
        console.log("processed notification job id",job.id)

        await sendNotificationProcessor({
            user_id:job.data.user_id,
            type:job.data.type,
            event:job.data.event,
            payload:job.data.payload
        })
        console.log("Note created notification sent successfully!")
    },
    {
        connection:redisClient as any,
        concurrency:10
    },
    
)

notificationWorker.on("completed",(job)=>{
    console.log("job completed",job.id)
})

notificationWorker.on("failed",(job,error)=>{
    console.log("job failed",job?.id)
    console.log(error.message)
})