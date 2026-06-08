import type {Pool, PoolClient} from "pg";
import { Notes } from "../models/Notes.model.js";
import { pool } from "../../../configs/db.config.js";

export const createNotes = async (
  note_name: string,
  note_content: string,
  user_id: string,
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
    note_name,note_content,user_id
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
    SELECT note_id,user_id,note_name,note_content
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





export const deleteNotesRepository = async (
  note_id: string,

  user_id: string,

  client: PoolClient,
) => {
  try{

  
  const result = await client.query(
    `
    UPDATE notes 
    SET is_deleted = TRUE
    WHERE note_id = $1 AND 
          user_id = $2
    RETURNING *
    `,
    [
      note_id,user_id
    ]
  )
  return result.rows[0]


}catch(err){
  throw err
}
};

export const findNoteByIdRepository = async (
  note_id: string,

  client: PoolClient,
) => {
  const result =await client.query(
    `
    SELECT * FROM notes WHERE note_id = $1 AND is_deleted = FALSE
    `,
    [note_id]
  )

  return result.rows[0]
};

export const pinNotesRepository = async (
  user_id: string,

  note_id: string,

  client: PoolClient,
) => {
  const result = await client.query(

    `
      UPDATE notes 
      SET is_pinned = TRUE
      WHERE note_id = $1 AND
            user_id = $2
      RETURNING *
    `,[
      note_id,user_id
    ]
  )
  return result.rows[0]
};


export const unPinNoteRepository = async (
  user_id: string,

  note_id: string,

client:PoolClient

) => {
  const result = await client.query(
`
UPDATE notes
SET is_pinned = FALSE
WHERE note_id = $1 AND 
      user_id = $2
RETURNING *
`,
[
  note_id,user_id
]

  )

  return result.rows[0]
};




export const patchUpdateNoteRepository = async (
  note_id: string,

  new_note_name: string | undefined,

  new_note_content: string | undefined,

  user_id: string,

  client: PoolClient,
) => {
 const result = await client.query(
  `
  UPDATE notes 
  SET note_name = COALESCE($1,note_name),
      note_content = COALESCE($2, note_content)
  WHERE user_id = $3 AND note_id = $4
  RETURNING *
  `,
  [new_note_name,new_note_content,user_id,note_id]
  
  )

 
 return result.rows[0]
}


export const getPinnedNotesRepository = async(user_id:string) =>{
  try{
    const result = await pool.query(
      `
      SELECT note_id,user_id,note_name,note_name FROM notes 
      WHERE is_deleted = FALSE AND user_id = $1

      `,
      [user_id]
    )

    return result.rows
  }catch(err){
    throw err
  }
}

export const getMyNotesRepository = async (user_id:string) =>{
  const result = await pool.query(

  `
    SELECT * FROM notes 
    WHERE user_id = $1

  `,
  [user_id]
  )

  return result.rows
} 


export const findPurchaseByNoteAndBuyer = async(note_id:string,buyer_id:string, client:PoolClient) =>{
  const result = await client.query(
    `
    SELECT * FROM note_purchases 
    WHERE note_id = $1 
    AND buyer_id = $2
    LIMIT 1
    `,
    [note_id,buyer_id]
  )
  return result.rows[0]
}

export const findPurchaseByIdempotencyKey = async(idempotencyKey:string,client:PoolClient) => {
  const result = await client.query(
    `
    SELECT * FROM note_purchases
    WHERE idempotency_key = $1
    LIMIT 1 
    `,[idempotencyKey]
  )
  return result.rows[0]
}

export const createNotePurchase = async(
  note_id:string,
  buyer_id:string,
  seller_id:string,
  idempotency_key:string,
  amount:number,
  client:PoolClient

) =>{   
  const result = await client.query(
    `
    INSERT INTO note_purchases(note_id,buyer_id,seller_id,idempotency_key,amount) VALUES ($1,$2,$3,$4,$5) RETURNING *
    `,
    [
      note_id,
      buyer_id,
      seller_id,
      idempotency_key,
      amount
    ]
  )
  return result.rows[0]
}
