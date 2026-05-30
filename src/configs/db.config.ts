import { config } from "./env.config.js"
import {Pool} from "pg"

export const pool = new Pool({
 connectionString: config.DATABASE_URL,
 ssl:{
  rejectUnauthorized: false
 }
})


export const connectDB = async () =>{
 await pool.query("SELECT 1")
}
/*import mongoose from "mongoose"
import dns from "node:dns"

import { config } from "./env.config.js"

dns.setDefaultResultOrder(
"ipv4first"
)

export const connectDB = async():Promise<void>=>{

try{

await mongoose.connect(

config.MONGO_URI,

{

family:4

}

)

console.log(
"database connected"
)

}catch(err){

console.log(
"failed to connect database"
)

console.error(
err
)

throw err

}

}*/

