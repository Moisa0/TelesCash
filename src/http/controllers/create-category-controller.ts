import { Request, Response } from "express"
import { z } from "zod"

import { CreateCategoryUseCase } from "../../use-cases/create-category" 
import { ResourceNotFoundError } from "../../use-cases/errors/resource-not-found-error"


export async function createCategoryController(req:Request, res:Response){
    const registerBodySchema = z.object({
        name:z.string(),

    })
    console.log("Dados recebidos:", req.body)

    const user_id = req.user.id

    try {
            const {name} = registerBodySchema.parse(req.body)
        await CreateCategoryUseCase({name, user_id})
    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return res.status(404).send()
        }
        return res.status(500).send()
    }

    return res.status(201).send()
}