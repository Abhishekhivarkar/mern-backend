import type {Request,Response} from "express"
// request body type
import type {notesReqBodyType,getAllNotesReqBodyType} from "../types/requests/notes.request.js"
// response body type 
import type {notesResBodyType,getAllNotesResBodyType} from "../types/responses/notes.response.js"
//services
import {createNotesService,getAllNotesService} from "../services/notes.service.js"
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


export const getAllNotes = asyncHandler(async(req:Request<{},getAllNotesResBodyType,getAllNotesReqBodyType>,res:Response<getAllNotesResBodyType>) =>{
 
 const notes = await getAllNotesService()
 
 return res.status(200).json({
  success:true,
  data:notes
 })
})