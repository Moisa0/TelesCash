import { prisma } from "../lib/prisma"
import { Category } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreateCategoryRequest{
    user_id: string;
    name: string;
}

interface CreateCategoryResponse{
    categories: Category
}

export async function CreateCategoryUseCase({user_id, name}:CreateCategoryRequest){

    const userFound = await prisma.user.findUnique({
        where:{
            id: user_id
        }
    })

    if(!userFound){
        throw new ResourceNotFoundError()
    }


       const category= await prisma.category.create({
        data:{
            name,
            user_id
          }
    })

    return{
        category
    }
}