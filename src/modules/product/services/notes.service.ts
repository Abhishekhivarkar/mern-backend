import {createNotes} from "../repositories/notes.repository.js"

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