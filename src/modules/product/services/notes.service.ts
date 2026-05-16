import {createNotes,getAllNotes} from "../repositories/notes.repository.js"
import {AppError} from "../../../utils/appError.util.js"
declare global{
 namespace Express{
  interface Request{ 
   userId:{
    id:string
   }
  }
 }
}


export const createNotesService =async (title:string,content:string,userId:string) =>{
 
 const user = await createNotes(title,content,userId)
 
 return user
}


export const getAllNotesService = async() =>{
 const notes = await getAllNotes()
 
 if(notes.length === 0 || !notes){
  throw new AppError("0 notes available",401)
 }
 
 return notes
}