import { z } from "zod"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UnauthorizedError } from "../../use-cases/errors/unauthorized-error"
import { env } from "../../env"
import { prisma } from "../../lib/prisma"
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error"
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error"
import { registerUseCase } from "../../use-cases/register"




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