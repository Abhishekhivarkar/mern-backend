import {createClient} from "redis"
import {config} from "./env.config.js"

export const redisClient = createClient({
    url: config.REDIS_URL
})

redisClient.on("connect", ()=>{
    console.log("Redis connected")
})

redisClient.on("error",(err)=>{
    console.log("Redis connection error", err)
})

export const connectRedis= async ():Promise<void>=>{
    await redisClient.connect()
}