import {createAdapter} from "@socket.io/redis-adapter"

import { redisClient } from "../configs/redis.config.js"

export const getSocketAdapter = () =>{
    const pub = redisClient
    const sub = redisClient.duplicate()

    return createAdapter(
        pub,sub
    )
}