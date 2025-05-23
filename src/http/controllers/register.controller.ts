import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../../lib/prisma"



export async function register(req:Request, res:Response){
    const registerBodySchema = z.object({
        name:z.string(),
        email: z.string().email(),
        password :z.string().min(6),
        wallet :z.number()
    })
    console.log("Dados recebidos:", req.body)
    const {name, email, password, wallet} = registerBodySchema.parse(req.body)

    await prisma.user.create({
        data:{
            name,
            email,
            password_hash: password,
            wallet
        }
    })

    return res.status(201).send()
}