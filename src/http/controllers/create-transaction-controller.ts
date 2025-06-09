import { Request, Response } from "express"
import { z } from "zod"

import { ResourceNotFoundError } from "../../use-cases/errors/resource-not-found-error"
import { CreateTransactionUseCase } from "../../use-cases/create-trasaction"
import { CategoryDoesNotExistsError } from "../../use-cases/errors/category-does-not-exists-error"
import { TransactionTypeError } from "../../use-cases/errors/transaction-type-error"


export async function createTransactionController(req:Request, res:Response){
    const registerBodySchema = z.object({
        name:z.string(),
        amount:z.number(), 
        category:z.string(), 
        type:z.string(),

    })

    //PEGA O ID DO USUÁRIO LOGADO
    const user_id = req.user.id

    try {
            const {name, amount, category, type} = registerBodySchema.parse(req.body)

        await CreateTransactionUseCase({name, user_id, amount, category, type})
    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return res.status(404).json({ message: err.message })
        }
        if(err instanceof CategoryDoesNotExistsError){
            return res.status(404).json({ message: err.message })
        }
        if(err instanceof TransactionTypeError){
            return res.status(400).json({ message: err.message })
        }
        return res.status(500).send()
    }

    return res.status(201).send()
}