import { prisma } from "../lib/prisma"
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface GetUserProfileUseCaseRequest{
    userId: string
}



interface GetUserProfileUseCase{
    user: User
}
export async function GetUserProfileUseCase({userId}:GetUserProfileUseCaseRequest){

    const userFound = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    if(!userFound){
        throw new ResourceNotFoundError()
    }

    return {
        userFound

    }
}