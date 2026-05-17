import {
  createNotes,
  getAllNotes,
  patchUpdateNoteRepository,
  deleteNotesRepository,
  pinNotesRepository,
  getPinnedNotesRepository,
} from "../repositories/notes.repository.js";
import { AppError } from "../../../common/utils/appError.util.js";
import { redisClient } from "../../../configs/redis.config.js";


declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const clearNotesCache = async () =>{
    const keys = await redisClient.keys("notes:*")
    const pinnedKeys = await redisClient.keys("pinnedNotes:*")

    const allKeys = [...keys,...pinnedKeys]
    if(allKeys.length > 0){
        await redisClient.del(allKeys)
    }
}
export {};
export const createNotesService = async (
  title: string,
  content: string,
  userId: string,
) => {
  const user = await createNotes(title, content, userId);

  await clearNotesCache()
  return user;
};

export const getAllNotesService = async (
  page: number,
  limit: number,
  search: string,
) => {
  const cacheKey = `notes:${page}:${limit}:${search}`;

  const cachedNotes = await redisClient.get(cacheKey)

  if(cachedNotes){
    return JSON.parse(cachedNotes)
  }
  const notes = await getAllNotes(page, limit, search);

  if (notes.length === 0 || !notes) {
    throw new AppError("0 notes available", 401);
  }

  await redisClient.set(
    cacheKey,
    JSON.stringify(notes),
    {
        EX:60
    }
  )

  return notes;
};

export const patchUpdateNotesService = async (
  noteId: string,
  newTitle: string | undefined,
  newContent: string | undefined,
  userId: string,
) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }
  const note = await patchUpdateNoteRepository(
    noteId,
    newTitle,
    newContent,
    userId,
  );

  if (!note) {
    throw new AppError("Note not found", 404);
  }
  await clearNotesCache()
  return note;
};

export const deleteNotesService = async (noteId: string, userId: string) => {
  const note = await deleteNotesRepository(noteId, userId);

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  await clearNotesCache()
  return note;
};

export const pinNotesService = async (noteId: string, userId: string) => {
  const note = await pinNotesRepository(noteId, userId);

  if (!note) {
    throw new AppError("Note not found", 404);
  }
  await clearNotesCache()
  return note;
};

export const getPinnedNotesService = async (userId: string) => {

    const cacheKey = `pinnedNotes:${userId}`

    const cachedNotes = await redisClient.get(cacheKey)

    if(cachedNotes){
        return JSON.parse(cachedNotes)
    }

  const note = await getPinnedNotesRepository(userId);

  if (note.length === 0) {
    throw new AppError("0 notes found", 404);
  }

  await redisClient.set(
    cacheKey,
    JSON.stringify(note),
    {
        EX:60
    }
  )
  return note;
};
