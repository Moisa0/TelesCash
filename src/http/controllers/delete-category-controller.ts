import { Request, Response } from "express"
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error"
import { GetTransactionsUseCase } from "../../use-cases/get-transactions"
import { z } from "zod"
import { GetCategoriesUseCase } from "../../use-cases/get-categories"
import { DeleteCategoryUseCase } from "../../use-cases/delete-category"




export async function DeleteCategoriesController(req:Request, res:Response){

    const paramsSchema = z.object({
    name:z.string(),

    })

        //PEGA O ID DO USUÁRIO LOGADO
    const user_id = req.user.id


    try {

        const {name} = paramsSchema.parse(req.params)

         await DeleteCategoryUseCase({user_id, name})

        return res.status(204).json({"message":"The category was deleted!" })
        
    } catch (err) {
        if(err instanceof UserAlreadyExistsError){
            return res.status(409).json({ message: err.message })
        }
        return res.status(500).send()
    }

}