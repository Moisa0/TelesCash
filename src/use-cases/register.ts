import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";



interface registerUseCaseRequest{
    name: string;
    email: string;
    password: string;
    wallet:number;
}

//o caso de uso serve para ser generalista e não servir apenas para uma requisição http, então não dá para usar res.send
export async function registerUseCase({name, email, password, wallet}:registerUseCaseRequest){

    const password_hash = await hash(password, 6)

        const userWithSameEmail = await prisma.user.findUnique({
            where:{
                email,
            }
        })

        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }
        await prisma.user.create({
            data:{
                name,
                email,
                password_hash,
                wallet
            }
        })


}