import { Request, Response } from "express"
import { z } from "zod"

import { AuthenticationUseCase } from "../../use-cases/authentication"
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error"
import jwt from "jsonwebtoken"
import { env } from "../../env"






export async function authenticate(req:Request, res:Response){
    const registerBodySchema = z.object({
        email:z.string(),
        password:z.string()

    })


    console.log("Dados recebidos:", req.body)




    try {
    const {email,password} = registerBodySchema.parse(req.body)
        
        const {userSaved} = await AuthenticationUseCase({email, password})


        const token = jwt.sign({}, env.JWT_SECRET,{
            subject:userSaved.id,
            expiresIn:'1h'
        })

        jwt

    return res.status(200).send(token)


    } catch (err) {
        if(err instanceof InvalidCredentialsError){
            return res.status(401).send()
        }
        return res.status(500).send()
    }

}