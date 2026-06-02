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

export const getAllNotesRepository = async (
  page: number,
  limit: number,
  search: string,
) => {
  const skip = (page - 1) * limit;

  const notesResult = await pool.query(
    `
    SELECT *
    FROM notes
    WHERE is_deleted = FALSE
      AND note_name ILIKE $1
    ORDER BY created_at DESC
    LIMIT $2
    OFFSET $3
    `,
    [`%${search}%`, limit, skip]
  );

  const countResult = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM notes
    WHERE is_deleted = FALSE
      AND note_name ILIKE $1
    `,
    [`%${search}%`]
  );

  return {
    notes: notesResult.rows,
    total: Number(countResult.rows[0].total),
  };
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

/*
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

export const patchUpdateNoteRepository = async (
  noteId: string,

  newTitle: string | undefined,

  newContent: string | undefined,

  userId: string,

  session?: ClientSession,
) => {
 const result = await pool.query(
  `
  UPDATE notes 
  SET note_name = $1, note_content = $2
  WHERE user_id = $3 AND note_id = $4
  `,
  [newTitle,newContent,user_id,noteId]
  
  )
 return result.rows[0]
}