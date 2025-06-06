import { Request, Response } from "express"
import { z } from "zod"

import { registerUseCase } from "../../use-cases/register"
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error"



export async function register(req:Request, res:Response){
    const registerBodySchema = z.object({
        name:z.string(),
        email: z.string().email(),
        password :z.string().min(6),
        wallet :z.number()
    })
    console.log("Dados recebidos:", req.body)



    try {
            const {name, email, password, wallet} = registerBodySchema.parse(req.body)
        await registerUseCase({name, email, password, wallet})
    } catch (err) {
        if(err instanceof UserAlreadyExistsError){
            return res.status(409).send()
        }
        return res.status(500).send()
    }

    return res.status(201).send()
}