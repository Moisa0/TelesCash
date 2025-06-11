import { Request, Response } from "express"
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error"




export async function getUserProfileController(req:Request, res:Response){


    try {

        const {name, email, wallet, created_at} = req.user
        return res.json({name, email, wallet, created_at})
        
    } catch (err) {
        if(err instanceof UserAlreadyExistsError){
            return res.status(409).json({ message: err.message })
        }
        return res.status(500).send()
    }


     
    
}