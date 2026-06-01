import type { ClientSession } from "mongoose";

import UserModel from "../../auth/models/User.model.js";
import NotesModel from "../models/Notes.model.js";

export const createNotes = async (
  title: string,
  content: string,
  userId: string,
  session?: ClientSession,
) => {
  const [note] = await NotesModel.create(
    [
      {
        title,
        content,
        user: userId,
      },
    ],
    {
      session,
    },
  );

  return note;
};
/*
export const getAllNotes = async (
  page: number,
  limit: number,
  search: string,
  session?: ClientSession,
) => {
  const skip = (page - 1) * limit;

  return NotesModel.find({
    isDeleted: false,

    title: {
      $regex: search,
      $options: "i",
    },
  })

    .select("-__v")

    .sort({
      createdAt: -1,
    })

    .skip(skip)

    .limit(limit)

    .session(session || null);
};

export const patchUpdateNoteRepository = async (
  noteId: string,

  newTitle: string | undefined,

  newContent: string | undefined,

  userId: string,

  session?: ClientSession,
) => {
  return NotesModel.findOneAndUpdate(
    {
      _id: noteId,

      user: userId,

      isDeleted: false,
    },

    {
      $set: {
        ...(newTitle && {
          title: newTitle,
        }),

        ...(newContent && {
          content: newContent,
        }),
      },
    },

    {
      returnDocument: "after",

      session,
    },
  );
};

export const deleteNotesRepository = async (
  noteId: string,

  userId: string,

  session?: ClientSession,
) => {
  return NotesModel.findOneAndUpdate(
    {
      _id: noteId,

      user: userId,

      isDeleted: false,
    },

    {
      $set: {
        isDeleted: true,
      },
    },

    {
      returnDocument: "after",

      session,
    },
  );
};

export const findUserById = async (
  userId: string,

  session?: ClientSession,
) => {
  return UserModel.findById(userId)

    .session(session || null);
};

export const pinNotesRepository = async (
  userId: string,

  noteId: string,

  session?: ClientSession,
) => {
  return UserModel.findByIdAndUpdate(
    userId,

    {
      $push: {
        pinnedNotes: noteId,
      },
    },

    {
      returnDocument: "after",

      session,
    },
  );
};

export const unPinNoteRepository = async (
  userId: string,

  noteId: string,

  session?: ClientSession,
) => {
  return UserModel.findByIdAndUpdate(
    userId,

    {
      $pull: {
        pinnedNotes: noteId,
      },
    },

    {
      returnDocument: "after",

      session,
    },
  );
};


*/