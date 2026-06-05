import { connectDB } from "./configs/db.config.js"

export const startWorker = async() =>{
    try{
        await connectDB()

        console.log("worker DB start")

        await import("./jobs/workers/email.worker.js")
        await import("./jobs/workers/notification.worker.js")
    }catch(err){
        console.log("Worker startup fialed")
        console.error(err)
    }
}

startWorker()