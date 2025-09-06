import * as z from "zod"

export const resgisterSchema=z.object({
    name:z.string("Must be add name").min(8,"Name must be at least 8 character "),
    email:z.email("Invalid email , Must be add email like example@gmail.com"),
    image:z.url("Must be add full url."),
    password:z.string("Must be add password").min(8,"Password must be at least 8 character")
})
export const logInSchema=z.object({
    email:z.email("Invalid email"),
    password:z.string("Must be add password").min(8,"Invalid Password")
})