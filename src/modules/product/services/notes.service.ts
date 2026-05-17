import {createNotes,getAllNotes,patchUpdateNoteRepository,deleteNotesRepository,pinNotesRepository,getPinnedNotesRepository} from "../repositories/notes.repository.js"
import {AppError} from "../../../utils/appError.util.js"
declare global{
 namespace Express{
  interface Request{ 
   userId?:string
  }
 }
}

export {}


export const createNotesService =async (title:string,content:string,userId:string) =>{
 
 const user = await createNotes(title,content,userId)
 
 return user
}


export const getAllNotesService = async(
 page:number,limit:number,search:string) =>{
 const notes = await getAllNotes(page,limit,search)
 
 if(notes.length === 0 || !notes){
  throw new AppError("0 notes available",401)
 }
 
 return notes
}

export const patchUpdateNotesService = async(noteId:string,newTitle:string | undefined,newContent:string | undefined,userId:string) =>{
 
 const note = await patchUpdateNoteRepository(noteId,newTitle,newContent,userId)
 
 if(!note){
  throw new AppError("Note not found",404)
 }
 
 return note
 
}


export const deleteNotesService =async (noteId:string,userId:string) =>{
 
 const note = await deleteNotesRepository(noteId,userId)
 
 if(!note){
  throw new AppError("Note not found",404)
 }
 
 return note
}

export const pinNotesService= async(noteId:string,userId:string) =>{
 
 const note = await pinNotesRepository(noteId,userId)
 
 if(!note){
  throw new AppError("Note not found",404)
 }
 
 return note
}

export const getPinnedNotesService = async (userId:string) =>{
 
 const note = await getPinnedNotesRepository(userId)
 
 if(note.length === 0){
  throw new AppError("0 notes found")
 }
 
 return note
}