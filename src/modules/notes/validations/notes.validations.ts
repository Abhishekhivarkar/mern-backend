import {z} from "zod"

export const createNotesSchema = z.object({
 title:z
     .string()
     .trim()
     .min(1,"Title is required")
     .max(100,"Title is too long"),
     
 content:z
     .string()
     .trim()
     .min(1,"Content is required"),
}).strict()

export type createNotesDto = z.infre<createNotesSchema>