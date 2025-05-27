import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { hash } from 'bcryptjs'
import { registerUseCase } from "../../use-cases/register"



export async function register(req:Request, res:Response){
    const registerBodySchema = z.object({
        name:z.string(),
        email: z.string().email(),
        password :z.string().min(6),
        wallet :z.number()
    })
    console.log("Dados recebidos:", req.body)
    const {name, email, password, wallet} = registerBodySchema.parse(req.body)


    try {
        await registerUseCase({name, email, password, wallet})
    } catch (err) {
        return res.status(409).send()
    }

    return res.status(201).send()
}