import type {Request,Response} from "express"
// request body type
import type {notesReqBodyType,patchUpdateNotesReqBodyType} from "../types/requests/notes.request.js"
// response body type 
import type {notesResBodyType,getAllNotesResBodyType,patchUpdateNotesResBodyType} from "../types/responses/notes.response.js"
//params type 
import type {patchUpdateNotesParamsType} from "../types/params/notes.param.js"
// query type
import type {getAllNotesQueryType} from "../types/queries/notes.query.js"
//services
import {createNotesService,getAllNotesService,patchUpdateNotesService} from "../services/notes.service.js"
// async handler
import {asyncHandler} from "../../../utils/asyncHandler.util.js"

export const createNotes = asyncHandler(async(req:Request<{},notesResBodyType,notesReqBodyType>,res:Response<notesResBodyType>) =>{
 const {title,content} = req.body 
 const userId = req.userId
 const notes = await createNotesService(title,content,userId)
 
 return res.status(200).json({
  success:true,
  message:"Notes created successfully"
 })
})


export const getAllNotes = asyncHandler(async(req:Request<{},getAllNotesResBodyType,{},getAllNotesQueryType>,res:Response<getAllNotesResBodyType>) =>{
 
 const page = Number(req.query.page) || 1
 const limit = Number(req.query.limit) || 10
 const search = req.query.search || ""
 
 const notes = await getAllNotesService(page,limit,search)
 
 return res.status(200).json({
  success:true,
  data:notes
 })
})


export const patchUpdateNotes = asyncHandler(async(req:Request<patchUpdateNotesParamsType,patchUpdateNotesResBodyType,patchUpdateNotesReqBodyType>,res:Response<patchUpdateNotesResBodyType>)=>{
 const {noteId}= req.params
 const userId = req.userId
 const {newTitle,newContent} = req.body
 
 const notes = await patchUpdateNotesService(noteId,newTitle,newContent,userId)
 
 return res.status(200).json({
  success:true,
  message:"Note updated successfully"
 })
})