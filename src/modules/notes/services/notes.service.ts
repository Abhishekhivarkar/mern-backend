import {
  createNotes,
  getAllNotesRepository,
  // patchUpdateNoteRepository,
  // deleteNotesRepository,
  // pinNotesRepository,
  // findUserById,
  // unPinNoteRepository,
} from "../repositories/notes.repository.js";

import mongoose from "mongoose";

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

  userId: string,
) => {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    const note = await createNotes(note_name, note_content, userId, client);

    await client.query("COMMIT")
    await clearNotesCache();
    await sendNoteCreatedNotificationToUser(userId,{
      noteId:note.note_id,
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

  if (notes.length === 0) {
    throw new AppError(
      MESSAGES.PRODUCT.NOT_FOUND,

      HTTP_STATUS.NOT_FOUND,
    );
  }

  await redisClient.set(
    cacheKey,

    JSON.stringify(notes),

    "EX",

    60,
  );

  return notes;
};

// export const patchUpdateNotesService = async (
//   noteId: string,

//   newTitle: string | undefined,

//   newContent: string | undefined,

//   userId: string,
// ) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const note = await patchUpdateNoteRepository(
//       noteId,

//       newTitle,

//       newContent,

//       userId,

//       session,
//     );

//     if (!note) {
//       throw new AppError(
//         MESSAGES.PRODUCT.NOT_FOUND,

//         HTTP_STATUS.NOT_FOUND,
//       );
//     }

//     await session.commitTransaction();

//     await clearNotesCache();
//     await sendNoteUpdatedNotificationToUser(userId,{
//       title:newTitle,
//       noteId:noteId,
//       message:"Note updated successfully!"
//     })
//     return note;
//   } catch (error) {
//     await session.abortTransaction();

//     throw error;
//   } finally {
//     await session.endSession();
//   }
// };

// export const deleteNotesService = async (
//   noteId: string,

//   userId: string,
// ) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const note = await deleteNotesRepository(
//       noteId,

//       userId,

//       session,
//     );

//     if (!note) {
//       throw new AppError(
//         MESSAGES.PRODUCT.NOT_FOUND,

//         HTTP_STATUS.NOT_FOUND,
//       );
//     }

//     await session.commitTransaction();

//     await clearNotesCache();

//     return note;
//   } catch (error) {
//     await session.abortTransaction();

//     throw error;
//   } finally {
//     await session.endSession();
//   }
// };

// export const pinNotesService = async (
//   noteId: string,

//   userId: string,
// ) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const user = await findUserById(userId, session);

//     if (!user) {
//       throw new AppError(
//         MESSAGES.AUTH.USER_NOT_FOUND,

//         HTTP_STATUS.NOT_FOUND,
//       );
//     }

//     const alreadyPinned = user.pinnedNotes.some((id) => id.equals(noteId));

//     if (alreadyPinned) {
//       throw new AppError(
//         MESSAGES.PRODUCT.ALREADY_PINNED,

//         HTTP_STATUS.BAD_REQUEST,
//       );
//     }

//     if (user.pinnedNotes.length >= 5) {
//       throw new AppError(
//         MESSAGES.PRODUCT.PIN_LIMIT_EXCEEDED,

//         HTTP_STATUS.BAD_REQUEST,
//       );
//     }

//     const note = await pinNotesRepository(
//       userId,

//       noteId,

//       session,
//     );

//     await session.commitTransaction();

//     await clearNotesCache();

//     return note;
//   } catch (error) {
//     await session.abortTransaction();

//     throw error;
//   } finally {
//     await session.endSession();
//   }
// };

// export const unPinNotesService = async (
//   userId: string,

//   noteId: string,
// ) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const user = await findUserById(userId, session);

//     if (!user) {
//       throw new AppError(
//         MESSAGES.AUTH.USER_NOT_FOUND,

//         HTTP_STATUS.NOT_FOUND,
//       );
//     }

//     const exists = user.pinnedNotes.some((id) => id.equals(noteId));

//     if (!exists) {
//       throw new AppError(
//         MESSAGES.PRODUCT.NOT_FOUND,

//         HTTP_STATUS.NOT_FOUND,
//       );
//     }

//     const note = await unPinNoteRepository(
//       userId,

//       noteId,

//       session,
//     );

//     await session.commitTransaction();

//     await clearNotesCache();

//     return note;
//   } catch (error) {
//     await session.abortTransaction();

//     throw error;
//   } finally {
//     await session.endSession();
//   }
// };

// export const getPinnedNotesService = async (userId: string) => {
//   const cacheKey = `pinnedNotes:${userId}`;

//   const cached = await redisClient.get(cacheKey);

//   if (cached) {
//     return JSON.parse(cached);
//   }

//   const user = await findUserById(userId);
// if(!user){
//   throw new AppError(MESSAGES.AUTH.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
// }

//   const notes = user.pinnedNotes
//   if(!notes || notes.length === 0){
//     throw new AppError(MESSAGES.PRODUCT.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
//   }
//   await redisClient.set(
//     cacheKey,

//     JSON.stringify(notes),

//     "EX",

//     60,
//   );

//   return notes;
// };
