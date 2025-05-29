import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"


interface authenticationUseCaseRequest{
    email: string;
    password: string;
}

export async function authenticationUseCase({email, password}:authenticationUseCaseRequest){
    //buscar usuario no banco pelo email e verificar se a senha corresponde à do banco

const userSaved = await prisma.user.findUnique({
    where:{
        email
    }
})

      //  if(!userSaved){falta validações}
                
}