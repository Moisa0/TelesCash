import { Request, Response } from "express"
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error"
import { GetTransactionsUseCase } from "../../use-cases/get-transactions"
import { z } from "zod"
import { GetCategoriesUseCase } from "../../use-cases/get-categories"




export async function getCategoriesController(req:Request, res:Response){


        //PEGA O ID DO USUÁRIO LOGADO
    const user_id = req.user.id


    try {
        const categories = await GetCategoriesUseCase({user_id})

        return res.json(categories.categories)
        
    } catch (err) {
        if(err instanceof UserAlreadyExistsError){
            return res.status(409).json({ message: err.message })
        }
        return res.status(500).send()
    }

}