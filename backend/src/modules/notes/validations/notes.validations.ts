import { z } from "zod";

// validation for note_id

export const note_idParamSchema = z.object({
  note_id: z.string({
    message: "Invalid note id",
  }),
});


export const NoteCategoryEnum = z.enum([
    "PROGRAMMING",
    "DATA_STRUCTURE",
    "COLLEGE_NOTES",
    "WEB_DEVELOPMENT",
    "DATABASE"
])

export type NoteCategory = z.infer<typeof NoteCategoryEnum>

export const createNotesSchema = z
  .object({
    note_name: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(100, "Title is too long"),

    note_content: z.string().trim().min(1, "Content is required"),

    price: z.coerce.number().min(0,"Price cannot be negative"),
    is_published: z.coerce.boolean().optional().default(false),
    category: NoteCategoryEnum,

    is_featured: z
        .coerce.boolean().optional().default(false)
  }

)
  .strict();

export type createNotesDto = z.infer<typeof createNotesSchema>;

export const patchUpdateNotesSchema = z
  .object({
    new_note_name: z
      .string()
      .trim()
      .min(1, "New title required")
      .max(100, "Title is too long")
      .optional(),
    new_note_content: z
      .string()
      .trim()
      .min(1, "New content required")
      .max(100, "content is too long")
      .optional(),
  })
  .strict();

export type patchUpdateNotesDto = z.infer<typeof patchUpdateNotesSchema>;



