import {Worker,Job} from "bullmq"
import { sendNotificationProcessor } from "../processors/notification.processor.js"
import { NotificationJobData } from "../queues/notification.queue.js"
import { redisClient } from "../../configs/redis.config.js"

export const notificationWorker = new Worker("notificationQueue",
    async (job:Job<NotificationJobData>)=>{
        console.log("processed notification job id",job.id)

        await sendNotificationProcessor({
            userId:job.data.userId,
            event:job.data.event,
            payload:job.data.payload
        })
        console.log("Note created notification sent successfully!")
    },
    {
        connection:redisClient,
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