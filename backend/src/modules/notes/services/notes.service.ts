import {
  createNotes,
  getAllNotesRepository,
  patchUpdateNoteRepository,
  deleteNotesRepository,
  pinNotesRepository,
  findNoteByIdRepository,
  unPinNoteRepository,
  // findUserById,
  getPinnedNotesRepository,
  getMyNotesRepository

} from "../repositories/notes.repository.js";


import { redisClient } from "../../../configs/redis.config.js";

import { AppError } from "../../../common/utils/appError.util.js";

import { HTTP_STATUS } from "../../../common/constants/httpStatus.constant.js";

import { MESSAGES } from "../../../common/constants/messages.constant.js";
import { sendNoteCreatedNotificationToUser, sendNoteUpdatedNotificationToUser } from "../../../common/services/notification.service.js";
import { pool } from "../../../configs/db.config.js";

const clearNotesCache = async () => {
  const notesKeys = await redisClient.keys("notes:*");

  const pinnedKeys = await redisClient.keys("pinnedNotes:*");

  const allKeys = [...notesKeys, ...pinnedKeys];

  if (allKeys.length) {
    await redisClient.del(...allKeys);
  }
};

export const createNotesService = async (
  note_name: string,

  note_content: string,

  user_id: string,
) => {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    const note = await createNotes(note_name, note_content, user_id, client);

    await client.query("COMMIT")
    await clearNotesCache();
    await sendNoteCreatedNotificationToUser(user_id,{
      note_id:note.note_id,
      title:note_name,
      message:"Note created successfully"
    })
    return note;
  } catch (error) {
   await client.query("ROLLBACK")

    throw error;
  } finally {
    await client.release()
  }
};

export const getAllNotesService = async (
  page: number,

  limit: number,

  search: string,
) => {
  const cacheKey = `notes:${page}:${limit}:${search}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const notes = await getAllNotesRepository(page, limit, search);

 

  await redisClient.set(
    cacheKey,

    JSON.stringify(notes),

    "EX",

    60,
  );

  return notes;
};

export const patchUpdateNotesService = async (
  note_id: string,

  new_note_name: string | undefined,

  new_note_content: string | undefined,

  user_id: string,
) => {
  const  client = await pool.connect()

  try {
    await client.query("BEGIN")

    const note = await patchUpdateNoteRepository(
      note_id,

      new_note_name,

      new_note_content,

      user_id,

      client,
    );

    if (!note) {
      throw new AppError(
        MESSAGES.PRODUCT.NOT_FOUND,

        HTTP_STATUS.NOT_FOUND,
      );
    }

    await client.query("COMMIT")

    await clearNotesCache();
    await sendNoteUpdatedNotificationToUser(user_id,{
      title:new_note_name,
      note_id:note_id,
      message:"Note updated successfully!"
    })
    return note;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    await client.release();
  }
};

export const deleteNotesService = async (
  note_id: string,

  user_id: string,
) => {
  const client = await pool.connect()

  try {
   await client.query("BEGIN");

    const note = await deleteNotesRepository(
      note_id,

      user_id,

      client,
    );

    if(!note){
      throw new AppError(MESSAGES.PRODUCT.NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
    }

    await client.query("COMMIT");

    await clearNotesCache();

    return note;
  } catch (error) {
    await client.query("ROLLBACK")

    throw error;
  } finally {
    await client.release();
  }
};

export const pinNotesService = async (
  note_id: string,

  user_id: string,
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const note = await findNoteByIdRepository(note_id, client);

    if (!note) {
      throw new AppError(
        MESSAGES.PRODUCT.NOT_FOUND,

        HTTP_STATUS.NOT_FOUND,
      );
    }

  
    if (note.is_pinned === true) {
      throw new AppError(
        MESSAGES.PRODUCT.ALREADY_PINNED,

        HTTP_STATUS.BAD_REQUEST,
      );
    }

    if (note.is_pinned.length >= 5) {
      throw new AppError(
        MESSAGES.PRODUCT.PIN_LIMIT_EXCEEDED,

        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const pin_note = await pinNotesRepository(
      user_id,

      note_id,

      client,
    );

    await client.query("COMMIT");

    await clearNotesCache();

    return pin_note;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    await client.release();
  }
};

export const unPinNotesService = async (
  user_id: string,

  note_id: string,
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const note = await findNoteByIdRepository(note_id, client);

    if (!note) {
      throw new AppError(
        MESSAGES.PRODUCT.NOT_FOUND,

        HTTP_STATUS.NOT_FOUND,
      );
    }

  

    if (note.is_pinned === false) {
      throw new AppError(
        MESSAGES.PRODUCT.ALREADY_UNPINNED,

        HTTP_STATUS.BAD_REQUEST
      );
    }

    const un_pin_note = await unPinNoteRepository(
      user_id,

      note_id,

      client,
    );

    await client.query("COMMIT");

    await clearNotesCache();

    return un_pin_note;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    await client.release();
  }
};

export const getPinnedNotesService = async (user_id: string) => {
  const cacheKey = `pinnedNotes:${user_id}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const notes = await getPinnedNotesRepository(user_id);

if(!notes || notes.length === 0){
  throw new AppError(MESSAGES.PRODUCT.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
}

  await redisClient.set(
    cacheKey,

    JSON.stringify(notes),

    "EX",

    60,
  );

  return notes;
};


export const getMyNotesService = async(user_id:string) =>{
   const note = await getMyNotesRepository(user_id)

   if(note.length === 0){
    throw new AppError(MESSAGES.PRODUCT.ZERO_NOTES,HTTP_STATUS.BAD_REQUEST)
   }

   return note

}