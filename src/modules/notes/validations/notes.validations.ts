import {z} from "zod"

// validation for noteId

export const noteIdParamSchema = z.object({
    noteId:z
        .uuid({message:"Invalid note id"})
})

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

export type createNotesDto = z.infer<typeof createNotesSchema>


export const patchUpdateNotesSchema = z.object({
    newTitle:z
        .string()
        .trim()
        .min(1,"New title required")
        .max(100,"Title is too long"),

    newContent:z
        .string()
        .trim()
        .min(1,"New content required")
        .max(100,"content is too long")
}).strict()

export type patchUpdateNotesDto = z.infer<typeof patchUpdateNotesSchema>