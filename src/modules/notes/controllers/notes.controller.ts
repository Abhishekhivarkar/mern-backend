import type {Request,Response} from "express"
 
//services
import {createNotesService/*getAllNotesService,patchUpdateNotesService,deleteNotesService,pinNotesService,unPinNotesService,getPinnedNotesService*/} from "../services/notes.service.js"
// async handler
import {asyncHandler} from "../../../common/utils/asyncHandler.util.js"

import type { UpdateNoteDto } from "../types/dtos/updateNote.dto.js"
import type { NoteResponseDto } from "../types/dtos/notes.response.dto.js"
import type { GetAllNotesResponseDto } from "../types/dtos/getAllNotes.response.dto.js"
import type { GetPinnedNotesResponseDto } from "../types/dtos/getPinnedNotes.response.dto.js"
import type { NoteParamDto } from "../types/dtos/note.params.dto.js"
import type { GetAllNotesQueryDto } from "../types/dtos/getAllNotes.query.dto.js"
import {HTTP_STATUS} from "../../../common/constants/httpStatus.constant.js"
import {MESSAGES} from "../../../common/constants/messages.constant.js"
import { createNotesDto, patchUpdateNotesDto } from "../validations/notes.validations.js"
import { logger } from "../../../common/services/logger.service.js"




export const createNotes = asyncHandler(async(req:Request<{},NoteResponseDto,createNotesDto>,res:Response<NoteResponseDto>) =>{
 const {note_name,note_content} = req.body 
 const userId = req.userId!

 logger.info({
  message:"Create notes request received",
  title:note_name
 })

 await createNotesService(note_name,note_content,userId)
 
 logger.info({
  message:"Note created successfully"
 })
 return res.status(HTTP_STATUS.CREATED).json({
  success:true,
  message:MESSAGES.PRODUCT.CREATED_SUCCESS
 })
})


export const getAllNotes = asyncHandler(async(req:Request<{},GetAllNotesResponseDto,{},GetAllNotesQueryDto>,res:Response<GetAllNotesResponseDto>) =>{
 logger.info({
  message:"Get all notes request received"
 })
 const page = Number(req.query.page) || 1
 const limit = Number(req.query.limit) || 10
 const search = req.query.search || ""
 
 const notes = await getAllNotesService(page,limit,search)
 logger.info({
  message:"Notes received successfully"
 })

 return res.status(HTTP_STATUS.OK).json({
  success:true,
  data:notes
 })
})


// // export const patchUpdateNotes: RequestHandler<NoteParamDto,NoteResponseDto,UpdateNoteDto> = asyncHandler(async(req,res)=>{
// //  const {noteId}= req.params
// //  const userId = req.userId!
// //  const {newTitle,newContent} = req.body
 

// //  const notes = await patchUpdateNotesService(noteId,newTitle,newContent,userId)
 
// //  return res.status(HTTP_STATUS.OK).json({
// //   success:true,
// //   message:MESSAGES.PRODUCT.UPDATED_SUCCESS
// //  })
// // })

// export const patchUpdateNotes = asyncHandler<
//   NoteParamDto,
//   NoteResponseDto,
//   patchUpdateNotesDto
// >(async (req, res) => {
//   logger.info({
//     message:"Patch update notes request received"
//   })
//  const { noteId } = req.params

//  await patchUpdateNotesService(
//    noteId,
//    req.body.newTitle,
//    req.body.newContent,
//    req.userId!
//  )
//  logger.info({
//   message:"Patch update successfully"
//  })
//  res.status(200).json({
//    success: true,
//    message: MESSAGES.PRODUCT.UPDATED_SUCCESS
//  })
// })


// export const deleteNotes = asyncHandler(async(req:Request<NoteParamDto,NoteResponseDto,{},{}>,res:Response<NoteResponseDto>)=>{
//   const {noteId} = req.params
//   const userId = req.userId!
  
  
//   await deleteNotesService(noteId,userId)
  
//   return res.status(HTTP_STATUS.OK).json({
//    success:true,
//    message:MESSAGES.PRODUCT.DELETE_SUCCESS
//   })
// })



// export const pinNotes = asyncHandler(async(req:Request<NoteParamDto,NoteResponseDto,{},{}>,res:Response<NoteResponseDto>)=>{
//  const {noteId} = req.params
//  const userId = req.userId!
  
//  await pinNotesService(noteId,userId)
 
//  return res.status(HTTP_STATUS.OK).json({
//   success:true,
//   message:MESSAGES.PRODUCT.PINNED
//  })
// })

// export const unPinNotes = asyncHandler(async(req:Request<NoteParamDto,NoteResponseDto,NoteResponseDto>,res:Response<NoteResponseDto>)=>{
//   const userId = req.userId!
//   const {noteId} = req.params
   
//   await unPinNotesService(userId,noteId)

//   return res.status(HTTP_STATUS.OK).json({
//     success:true,
//     message:MESSAGES.PRODUCT.UNPINNED
//   })
// })


// export const getPinnedNotes =asyncHandler(async(req:Request<{},GetPinnedNotesResponseDto,{},{}>,res:Response<GetPinnedNotesResponseDto>)=>{
//  const userId = req.userId!
  
//  const user = await getPinnedNotesService(userId)
 
//  return res.status(HTTP_STATUS.OK).json({
//   success:true,
//   data:user,
//   count:user.length
//  })
// })


