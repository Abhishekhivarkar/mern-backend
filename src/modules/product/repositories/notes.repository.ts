import NotesModel from "../models/Notes.model.js"

export const createNotes = async(title:string,content:string,userId:string) =>{
 return await NotesModel.create({
  title,
  content,
  user:userId
 })
}

export const getAllNotes = async(page:number,limit:number,search:string) =>{
 let skip = (page - 1) * 10
 
 return await NotesModel.find({
  isDeleted:false,
  title:{
   $regex:search,
   $options:"i"
  },
 }).select("-__v").sort({createdAt:-1}).skip(skip).limit(limit)
}

export const patchUpdateNoteRepository = async(noteId:string,newTitle:string | undefined,newContent:string | undefined,userId:string) =>{
 return await NotesModel.findOneAndUpdate(
  {
  _id:noteId,
  user:userId
 },
 {
  $set:{
   ...(newTitle && {title : newTitle}),
   ...(newContent && {content:newContent}),
  },
 },
 {returnDocument:"after"}
 )
}

export const deleteNotesRepository = async (noteId:string,userId:string) =>{
 return await NotesModel.findOneAndUpdate(
  {
  _id:noteId,
  user:userId
 },
 {
 $set:{
  isDeleted:true
 }
 },
 {returnDocument:"after"},

 )
}

export const pinNotesRepository = async(noteId:string,userId:string) =>{
  const note = await NotesModel.findOne(
  {
  _id:noteId,
  user:userId,
  isDeleted:false
 })
 if(!note){
  return
 }
 
 note.isPinned = !note.isPinned
 await note.save()
 
 return note
}


export const getPinnedNotesRepository = async(userId:string) =>{
 return await NotesModel.find({
  user:userId,
  isDeleted:false,
  isPinned:true
 })
}
