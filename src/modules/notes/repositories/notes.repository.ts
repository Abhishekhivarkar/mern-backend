import type {PoolClient} from "pg";
import { Notes } from "../models/Notes.model.js";
import { pool } from "../../../configs/db.config.js";

export const createNotes = async (
  note_name: string,
  note_content: string,
  userId: string,
  client: PoolClient,
):Promise<Notes>=> {
 const result = await client.query(
  `
  INSERT INTO notes(
  note_name,note_content,user_id
  )VALUES($1,$2,$3)
  RETURNING *
  `,
  [
    note_name,note_content,userId
  ]

 )

 return result.rows[0];
};

export const getAllNotes = async (
  page: number,
  limit: number,
  search: string,
) => {
  const skip = (page - 1) * limit;
  const result =await pool.query(
    `
    SELECT * FROM notes where is_deleted = FALSE AND note_name ILIKE $1 order_by DESC  LIMIT $2 OFFSET $3
    `,
    [
      `%${search}%`,limit,skip
    ]
  )
  const total = Number(result.rows[0].total)
};

/*
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