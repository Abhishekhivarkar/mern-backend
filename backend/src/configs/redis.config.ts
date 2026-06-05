import {Redis} from "ioredis";
import { config } from "./env.config.js";


export const redisClient = new Redis(config.REDIS_URL,{
  maxRetriesPerRequest:null
})

redisClient.on("connect",()=>{
  console.log("Redis connected")
})

redisClient.on("error",(error)=>{
  console.log("Failed to connect redis server")
  console.error(error)
})