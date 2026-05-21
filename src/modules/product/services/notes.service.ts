import {
  createNotes,
  getAllNotes,
  patchUpdateNoteRepository,
  deleteNotesRepository,
  pinNotesRepository,
  findUserById,
  getPinnedNotesRepository,
} from "../repositories/notes.repository.js";
import { AppError } from "../../../common/utils/appError.util.js";
import { redisClient } from "../../../configs/redis.config.js";
import { HTTP_STATUS } from "../../../common/constants/httpStatus.constant.js";
import { MESSAGES } from "../../../common/constants/messages.constant.js";
import mongoose from "mongoose";

const clearNotesCache = async () => {
  const keys = await redisClient.keys("notes:*");
  const pinnedKeys = await redisClient.keys("pinnedNotes:*");

  const allKeys = [...keys, ...pinnedKeys];
  if (allKeys.length > 0) {
    await redisClient.del(allKeys);
  }
};

export const createNotesService = async (
  title: string,
  content: string,
  userId: string,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const note = await createNotes(title, content, userId);
    await session.commitTransaction();
    await clearNotesCache();
    return note;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


export const getAllNotesService = async (
  page: number,
  limit: number,
  search: string,
) => {
  const cacheKey = `notes:${page}:${limit}:${search}`;

  const cachedNotes = await redisClient.get(cacheKey);

  if (cachedNotes) {
    return JSON.parse(cachedNotes);
  }
  const notes = await getAllNotes(page, limit, search);

  if (notes.length === 0 || !notes) {
    throw new AppError(MESSAGES.PRODUCT.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  await redisClient.set(
    cacheKey,
    JSON.stringify(notes),

    "EX",
    60,
  );

  return notes;
};

export const patchUpdateNotesService = async (
  noteId: string,
  newTitle: string | undefined,
  newContent: string | undefined,
  userId: string,
) => {
  /*if (!userId) {
    throw new AppError(MESSAGES., 401);
  }*/
 const session = await mongoose.startSession()

 try{

  session.startTransaction()
  const note = await patchUpdateNoteRepository(
    noteId,
    newTitle,
    newContent,
    userId,
  );

  if (!note) {
    throw new AppError(MESSAGES.PRODUCT.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
  await session.commitTransaction()
  await clearNotesCache();
  return note;
}catch(error){
  await session.abortTransaction()
  throw error
}finally{
  session.endSession()
}
};

export const deleteNotesService = async (noteId: string, userId: string) => {

  const session = await mongoose.startSession()

  try{
    session.startTransaction()
  const note = await deleteNotesRepository(noteId, userId);

  if (!note) {
    throw new AppError(MESSAGES.PRODUCT.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
  await session.commitTransaction()
  await clearNotesCache();
  return note;
}catch(error){
  await session.abortTransaction()
  throw error
}finally{
  session.endSession()
}
};

export const pinNotesService = async (noteId: string, userId: string) => {

  const session = await mongoose.startSession()
  try{
    session.startTransaction()
    
    const user = await findUserById(userId) 

    if(!user){
      throw new AppError(MESSAGES.AUTH.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }

    if(user.pinnedNotes?.length >= 5){
      throw new AppError(MESSAGES.PRODUCT.PIN_LIMIT_EXCEEDED,HTTP_STATUS.BAD_REQUEST)
    }

    if(
      user.pinnedNotes.some(
        pinnedId => pinnedId.equals(noteId)
      )
    ){
      throw new AppError(
       MESSAGES.PRODUCT.ALREADY_PINNED,HTTP_STATUS.BAD_REQUEST
      )
    }

    const note = await pinNotesRepository(userId,noteId)
    await session.commitTransaction()
  await clearNotesCache();
  return note;
}catch(error){
  await session.abortTransaction()
  throw error
}finally{
  await session.endSession()
}
}

export const getPinnedNotesService = async (userId: string) => {
  const cacheKey = `pinnedNotes:${userId}`;

  const cachedNotes = await redisClient.get(cacheKey);

  if (cachedNotes) {
    return JSON.parse(cachedNotes);
  }

  const note = await getPinnedNotesRepository(userId);

  if (note.length === 0) {
    throw new AppError(MESSAGES.PRODUCT.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  await redisClient.set(
    cacheKey,
    JSON.stringify(note),

    "EX",
    60,
  );
  return note;
};
