import mongoose from "mongoose"
import type {Model} from "mongoose"
import type {INotes} from "../types/interface/notes.interface.js"

const notesSchema = new mongoose.Schema<INotes>({
 title:{
  type:String,
  required:true
 },
 content:{
  type:String,
  required:true,
  maxlength:50
 },
 user:{
  type:mongoose.Types.ObjectId,
  ref:"User",
  required:true
 },
 isPinned:{
  type:Boolean,
  default:false
 },
},{timestamps:true})

const NotesModel:Model<INotes> = mongoose.model("Note",notesSchema)

export default NotesModel