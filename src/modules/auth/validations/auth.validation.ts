import {z} from "zod"

export const registerSchema = z.object({
    email:z
        .string()
        .trim()
        .toLowerCase()
        .min(1,"Email is required")
        .email("Invalid email address")
        .max(255,"Email is too long"),

    password:z
        .string()
        .min(8,"Password must be at least 8 characters")
        .max(100,"Password is too long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,"Password must contain uppercasem lowercase and number")
}).strict()

export type RegisterDto = z.infer<typeof registerSchema>

