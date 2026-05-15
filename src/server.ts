import {config} from "./configs/env.config.js"
import {connectDB} from "./configs/db.config.js"
import app from "./app.js"

const PORT:number = Number(config.PORT) || 5000
const startServer = async ():Promise<void> =>{
 try{
  
 
 await connectDB()
 
 app.listen(PORT ,()=>{
  console.log("server is runming on port",PORT)
 })
 
 }catch(err){
  console.log("failed to connect server")
 }
 
}

startServer()