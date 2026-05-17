import type {Request,Response} from "express"
 
//services
import {createNotesService,getAllNotesService,patchUpdateNotesService,deleteNotesService,pinNotesService,getPinnedNotesService} from "../services/notes.service.js"
// async handler
import {asyncHandler} from "../../../common/utils/asyncHandler.util.js"
import { AppError } from "../../../common/utils/appError.util.js"
import type { CreateNoteDto } from "../types/dtos/createNote.dto.js"
import type { UpdateNoteDto } from "../types/dtos/updateNote.dto.js"
import type { NoteResponseDto } from "../types/dtos/notes.response.dto.js"
import type { GetAllNotesResponseDto } from "../types/dtos/getAllNotes.response.dto.js"
import type { GetPinnedNotesResponseDto } from "../types/dtos/getPinnedNotes.response.dto.js"
import type { NoteParamDto } from "../types/dtos/note.params.dto.js"
import type { GetAllNotesQueryDto } from "../types/dtos/getAllNotes.query.dto.js"




export const createNotes = asyncHandler(async(req:Request<{},NoteResponseDto,CreateNoteDto>,res:Response<NoteResponseDto>) =>{
 const {title,content} = req.body 
 const userId = req.userId

  if(!userId){
    throw new AppError("Unauthorized",401)
  }

 const notes = await createNotesService(title,content,userId)
 
 return res.status(200).json({
  success:true,
  message:"Notes created successfully"
 })
})


export const getAllNotes = asyncHandler(async(req:Request<{},GetAllNotesResponseDto,{},GetAllNotesQueryDto>,res:Response<GetAllNotesResponseDto>) =>{
 
 const page = Number(req.query.page) || 1
 const limit = Number(req.query.limit) || 10
 const search = req.query.search || ""
 
 const notes = await getAllNotesService(page,limit,search)
 
 return res.status(200).json({
  success:true,
  data:notes
 })
})


export const patchUpdateNotes = asyncHandler(async(req:Request<NoteParamDto,NoteResponseDto,UpdateNoteDto,{}>,res:Response<NoteResponseDto>)=>{
 const {noteId}= req.params
 const userId = req.userId
 const {newTitle,newContent} = req.body
 
 if(!userId){
  throw new AppError("Unauthorized",401)
 }
 const notes = await patchUpdateNotesService(noteId,newTitle,newContent,userId)
 
 return res.status(200).json({
  success:true,
  message:"Note updated successfully"
 })
})



export const deleteNotes = asyncHandler(async(req:Request<NoteParamDto,NoteResponseDto,{},{}>,res:Response<NoteResponseDto>)=>{
  const {noteId} = req.params
  const userId = req.userId
  
  if(!userId){
    throw new AppError("Unauthorized",401)
  }
  const note = await deleteNotesService(noteId,userId)
  
  return res.status(200).json({
   success:true,
   message:"Note deleted successfully"
  })
})



export const pinNotes = asyncHandler(async(req:Request<NoteParamDto,NoteResponseDto,{},{}>,res:Response<NoteResponseDto>)=>{
 const {noteId} = req.params
 const userId = req.userId
  if(!userId){
    throw new AppError("Unauthorized",401)
  }
 const note = await pinNotesService(noteId,userId)
 
 return res.status(200).json({
  success:true,
  message:note.isPinned ? "Note pinned successfully" : "Note unpinned successfully"
 })
})



export const getPinnedNotes =asyncHandler(async(req:Request<{},GetPinnedNotesResponseDto,{},{}>,res:Response<GetPinnedNotesResponseDto>)=>{
 const userId = req.userId
  if(!userId){
    throw new AppError("Unauthorized",401)
  }
 const note = await getPinnedNotesService(userId)
 
 return res.status(200).json({
  success:true,
  data:note
 })
})


