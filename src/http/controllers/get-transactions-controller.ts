import { Request, Response } from "express"
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error"
import { GetTransactionsUseCase } from "../../use-cases/get-transactions"





export async function getTransactionsController(req:Request, res:Response){

        //PEGA O ID DO USUÁRIO LOGADO
    const user_id = req.user.id

    try {

        const transactions = await GetTransactionsUseCase({user_id})

        return res.json(transactions.transactions)
        
    } catch (err) {
        if(err instanceof UserAlreadyExistsError){
            return res.status(409).json({ message: err.message })
        }
        return res.status(500).send()
    }



    
}