import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { hash } from 'bcryptjs'



export async function register(req:Request, res:Response){
    const registerBodySchema = z.object({
        name:z.string(),
        email: z.string().email(),
        password :z.string().min(6),
        wallet :z.number()
    })
    console.log("Dados recebidos:", req.body)
    const {name, email, password, wallet} = registerBodySchema.parse(req.body)


    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
        where:{
            email,
        }
    })

    if(userWithSameEmail){
        return res.status(409).send('O email já está registrado')
    }

    await prisma.user.create({
        data:{
            name,
            email,
            password_hash,
            wallet
        }
    })

    return res.status(201).send()
}