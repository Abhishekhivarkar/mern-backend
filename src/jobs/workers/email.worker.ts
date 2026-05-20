import {Worker,Job} from "bullmq"
import { redisClient } from "../../configs/redis.config.js"

import {
    sendEmailProcessor
} from "../processors/email.processor.js"

import type {
    EmailJobData,
} from "../queues/email.queue.js"
import { email } from "envalid"

export const emailWorker = new Worker<EmailJobData>("emailQueue",
    async (job:Job<EmailJobData>) =>{
        console.log("Process email job:",job.id)

        await sendEmailProcessor({
            to:job.data.to,
            subject:job.data.subject,
            htmlContent:job.data.htmlContent
        })

        console.log("Email sent successfully!")
    },
    {
        connection: redisClient,
        concurrency:5
    }
)
    emailWorker.on("completed", (job)=>{
        console.log(`Job completed: ${job.id}`)
    })

    emailWorker.on("failed",(job,error)=>{
        console.log(`job failed: ${job?.id}`)
        console.log(error.message)
    })

