import type {Request,Response} from "express"
import type {notesReqBodyType} from "../types/requests/notes.request.js"
import type {notesResBodyType} from "../types/responses/notes.response.js"
import {createNotesService} from "../services/notes.service.js"
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