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

export const AddProductSchema=z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    description: z.string().trim().min(10, "Description must be at least 10 characters"),
    stock: z.coerce.number().nonnegative("Stock must be a positive number"),
    price: z.coerce.number().positive("Price must be a positive number"),
    rate: z.coerce.number().positive("Price must be a positive number"),
})
export const AddCategorySchema=z.object({
    title: z.string().trim().min(2, "Title must be at least 2 characters"),
    description: z.string().trim().min(10, "Description must be at least 10 characters"),
 
})