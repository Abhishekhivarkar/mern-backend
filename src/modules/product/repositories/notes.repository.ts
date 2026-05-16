import NotesModel from "../models/Notes.model.js"

export const createNotes = async(title:string,content:string,userId:string) =>{
 return await NotesModel.create({
  title,
  content,
  user:userId
 })
}