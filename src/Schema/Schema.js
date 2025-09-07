import * as z from "zod"

export const resgisterSchema=z.object({
    name:z.string("Must be add name").trim().min(8,"Name must be at least 8 character "),
    address:z.string("Must be add address").trim().min(8,"address must be at least 8 character "),
    email:z.email("Invalid email , Must be add email like example@gmail.com"),
    image:z.url("Must be add full url."),
    password:z.string("Must be add password").trim().min(6,"Password must be at least 6 character"),
    confirmPassword:z.string("Must be confirm password")
})
export const logInSchema=z.object({
    email:z.email("Invalid email"),
    password:z.string("Must be add password").min(6,"Invalid Password")
})