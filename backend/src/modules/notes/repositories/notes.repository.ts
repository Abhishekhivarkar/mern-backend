import type { Pool, PoolClient } from "pg";
import { Notes } from "../models/Notes.model.js";
import { pool } from "../../../configs/db.config.js";
import { NoteCategory } from "../validations/notes.validations.js";

export const createNotes = async (
  note_name: string,
  note_content: string,
  user_id: string,
  price: number,
  is_published: boolean,
  category: NoteCategory,
  images: string,
  client: PoolClient,
): Promise<Notes> => {
  const is_paid = price > 0;
  const result = await client.query(
    `
  INSERT INTO notes(
  note_name,
  note_content,
  user_id,
  price,
  is_paid,
  is_published,
  category,
  images
  )VALUES($1,$2,$3,$4,$5,$6,$7,$8)
  RETURNING *
  `,
    [
      note_name,
      note_content,
      user_id,
      price,
      is_paid,
      is_published,
      category,
      images,
    ],
  );

  return result.rows[0];
};

export const getAllNotesRepository = async (
  page: number,
  limit: number,
  search?: string,
  category?: NoteCategory,
  minPrice?: number,
  maxPrice?: number,
) => {
  const skip = (page - 1) * limit;

  const values: (string | number)[] = [];

  let whereClause = `
    WHERE is_deleted = FALSE
    AND is_published = TRUE
  `;

  if (search) {
    values.push(`%${search}%`);
    whereClause += `
      AND note_name ILIKE $${values.length}
    `;
  }

  if (category) {
    values.push(category);
    whereClause += `
      AND category = $${values.length}
    `;
  }

  if (
    minPrice !== undefined &&
    maxPrice !== undefined
  ) {
    values.push(minPrice);
    values.push(maxPrice);

    whereClause += `
      AND price BETWEEN $${values.length - 1}
      AND $${values.length}
    `;
  }

  const notesQuery = `
    SELECT
      note_id,
      user_id,
      note_name,
      note_content,
      price,
      category,
      images,
      created_at
    FROM notes
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const notesValues = [...values, limit, skip];

  const notesResult = await pool.query(
    notesQuery,
    notesValues,
  );

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM notes
    ${whereClause}
  `;

  const countResult = await pool.query(
    countQuery,
    values,
  );

  return {
    notes: notesResult.rows,
    total: Number(countResult.rows[0].total),
    page,
    limit,
  };
};


export const deleteNotesRepository = async (
  note_id: string,

  user_id: string,

  client: PoolClient,
) => {
  try {
    const result = await client.query(
      `
    UPDATE notes 
    SET is_deleted = TRUE
    WHERE note_id = $1 AND 
          user_id = $2
    RETURNING *
    `,
      [note_id, user_id],
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const findNoteByIdRepository = async (
  note_id: string | string[],

  client: PoolClient,
) => {
  const result = await client.query(
    `
    SELECT * FROM notes WHERE note_id = $1 AND is_deleted = FALSE
    `,
    [note_id],
  );

  return result.rows[0];
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
    `,
    [note_id, user_id],
  );
  return result.rows[0];
};

export const unPinNoteRepository = async (
  user_id: string,

  note_id: string,

  client: PoolClient,
) => {
  const result = await client.query(
    `
UPDATE notes
SET is_pinned = FALSE
WHERE note_id = $1 AND 
      user_id = $2
RETURNING *
`,
    [note_id, user_id],
  );

  return result.rows[0];
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
    [new_note_name, new_note_content, user_id, note_id],
  );

  return result.rows[0];
};

export const getPinnedNotesRepository = async (user_id: string) => {
  try {
    const result = await pool.query(
      `
      SELECT note_id,user_id,note_name,note_name FROM notes 
      WHERE is_deleted = FALSE AND user_id = $1

      `,
      [user_id],
    );

    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const getMyNotesRepository = async (user_id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM notes 
    WHERE user_id = $1

  `,
    [user_id],
  );

  return result.rows;
};

export const findPurchaseByNoteAndBuyer = async (
  note_id: string | string[],
  buyer_id: string,
  client?: PoolClient,
) => {
  const db = client ?? pool;
  const result = await db.query(
    `
    SELECT * FROM note_purchases 
    WHERE note_id = $1 
    AND buyer_id = $2
    LIMIT 1
    `,
    [note_id, buyer_id],
  );
  return result.rows[0];
};

export const findPurchaseByIdempotencyKey = async (
  idempotencyKey: string,
  client?: PoolClient,
) => {
  const db = client ?? pool;
  const result = await db.query(
    `
    SELECT * FROM note_purchases
    WHERE idempotency_key = $1
    LIMIT 1 
    `,
    [idempotencyKey],
  );
  return result.rows[0];
};

export const createNotePurchase = async (
  note_id: string,
  buyer_id: string,
  seller_id: string,
  idempotency_key: string,
  amount: number,
  razorpay_order_id: string,
  razorpay_payment_id: string,
  client?: PoolClient,
) => {
  const db = client ?? pool;
  const result = await db.query(
    `
    INSERT INTO note_purchases(note_id,buyer_id,seller_id,idempotency_key,amount,razorpay_order_id,razorpay_payment_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *
    `,
    [
      note_id,
      buyer_id,
      seller_id,
      idempotency_key,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
    ],
  );
  return result.rows[0];
};

export const getPurchasedNotesRepository = async (
  user_id: string | undefined,
) => {
  const result = await pool.query(
    `
    SELECT purchase_id,note_id,buyer_id,seller_id,amount,status,purchased_at FROM note_purchases
    WHERE buyer_id = $1
    `,
    [user_id],
  );
  return result.rows;
};

export const getNoteByIdRepository = async (note_id: string) => {
  const result = await pool.query(
    `
    SELECT * from notes 
    WHERE note_id = $1 AND is_deleted = FALSE
    LIMIT 1
    `,
    [note_id],
  );
  return result.rows[0];
};
