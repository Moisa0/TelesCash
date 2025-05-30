import { compare, hash } from "bcryptjs"
import { prisma } from "../lib/prisma"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";


interface GetUserProfileUseCaseRequest{
    userId: string
}

interface GetUserProfileUseCase{
    user
}
export async function GetUserProfileUseCase({userId}:GetUserProfileUseCaseRequest){

    const user = await prisma.user.findUnique({
        where:{
            id: user.Id
        }
    })
}