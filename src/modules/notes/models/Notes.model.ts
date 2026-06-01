// import mongoose from "mongoose"
// import type {Model} from "mongoose"
// import type {INotes} from "../types/notes.interface.js"

// const notesSchema = new mongoose.Schema<INotes>({
//  title:{
//   type:String,
//   required:true,
//   trim:true,
//   minlength:1,
//   maxlength:100
//  },
//  content:{
//   type:String,
//   required:true,
//   minlength:1,
//   trim:true
//  },
//  user:{
//   type:mongoose.Types.ObjectId,
//   ref:"User",
//   required:true
//  },
//  isPinned:{
//  type:Boolean,
//  default:false
//  },
//  isDeleted:{
//   type:Boolean,
//   default:false
//  },

// },{timestamps:true})

// const NotesModel:Model<INotes> = mongoose.model("Note",notesSchema)

// export default NotesModel

export 