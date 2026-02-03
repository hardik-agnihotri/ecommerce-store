import {email, z} from "zod";

export const signupSchema = z.object({
    body:z.object({
        username:z.string().min(2,"name is too short"),
        email:z.email(),
        password:z.string().min(6, "Password must be at least 8 chars")
    })
})

export const loginSchema = z.object({
    body:z.object({
        email:z.email(),
        password:z.string().min(6, "Password must be at least 8 chars")
    })
})