import type {PoolClient} from "pg";
import { Notes } from "../models/Notes.model.js";

export const createNotes = async (
  note_title: string,
  note_content: string,
  userId: string,
  client: PoolClient,
):Promise<Notes>=> {
 const result = await client.query(
  `
  INSERT INTO notes(
  note_title,note_content,userId
  )VALUES($1,$2,$3)
  RETURNING *
  `,
  [
    note_title,note_content,userId
  ]

 )

 return result.rows[0];
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