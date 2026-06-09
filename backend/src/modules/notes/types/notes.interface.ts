import type {Document} from "mongoose"
import mongoose from "mongoose"
export interface INotes extends Document{
 title:string,
 content:string,
 user:mongoose.Types.ObjectId,
 price:number,
 is_paid:boolean
 is_published:boolean
 isDeleted:boolean,
 createdAt:Date,
 updatedAt:Date
}