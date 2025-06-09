import { Request, Response } from "express"
import { z } from "zod"

import { CreateCategoryUseCase } from "../../use-cases/create-category" 
import { ResourceNotFoundError } from "../../use-cases/errors/resource-not-found-error"
import { CreateTransactionUseCase } from "../../use-cases/create-trasaction"


export async function createTransactionController(req:Request, res:Response){
    const registerBodySchema = z.object({
        name:z.string(),
        amount:z.number(), 
        category:z.string(), 
        type:z.string()

    })
    console.log("Dados recebidos:", req.body)

    const user_id = req.user.id

    try {
            const {name, amount, category, type} = registerBodySchema.parse(req.body)

        await CreateTransactionUseCase({name, user_id, amount, category, type})
    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return res.status(404).json({ message: err.message })
        }
        return res.status(500).send()
    }

    return res.status(201).send()
}