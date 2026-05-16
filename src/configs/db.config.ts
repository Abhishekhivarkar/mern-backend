import mongoose from "mongoose"
import {config} from "./env.config.js"

export const connectDB = async():Promise<void > =>{
 try{
  await mongoose.connect(config.MONGO_URI as string)
 
 console.log("detabase is connected")
 }catch(err){
  console.log("failed to connect database")
  process.exit(1)
 }
}