import { compare, hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";


interface authenticationUseCaseRequest{
    email: string;
    password: string;
}

interface AuthenticationUseCase{
    user: User
}


export async function AuthenticationUseCase({email, password}:authenticationUseCaseRequest){
    //buscar usuario no banco pelo email e verificar se a senha corresponde à do banco

const userSaved = await prisma.user.findUnique({
    where:{
        email
    }
})

    if(!userSaved){//validation
        throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, userSaved.password_hash)

    if(!doesPasswordMatches){//validation
        throw new InvalidCredentialsError()
    }

    return{
        userSaved
    }

}