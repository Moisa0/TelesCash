import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { UnauthorizedError } from "../use-cases/errors/unauthorized-error";
import { env } from "../env";
import { prisma } from "../lib/prisma";
import { InvalidCredentialsError } from "../use-cases/errors/invalid-credentials-error";


type JwtPayload = {
    id: string
}


export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction)=>{

    const {authorization} = req.headers

    if(!authorization){
        throw new UnauthorizedError()
    }

    const token = authorization.split(" ")[1]

    const { id } = jwt.verify(token, env.JWT_SECRET) as JwtPayload

    const userFound = await prisma.user.findUnique({
            where:{
                id
            }
        })

    if(!userFound){
            throw new InvalidCredentialsError()
    }    

    const {name, email, wallet, created_at} = userFound

    req.user = {name, email, wallet, created_at}
    
    next()


}