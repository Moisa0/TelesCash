import { prisma } from "../lib/prisma"
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreateCategoryRequest{
    userId: string;
    name: string;
}

interface CreateCategoryResponse{
    categories: any;
}

export async function CreateCategoryUseCase({userId, name}:CreateCategoryRequest){

    const userFound = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    if(!userFound){
        throw new ResourceNotFoundError()
    }

        //     await prisma.category.create({
        //     data:{
        //         name,

        //     }
        // })

}