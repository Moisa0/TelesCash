import { prisma } from "../lib/prisma"
import { Category } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CategoryDoesNotExistsError } from "./errors/category-does-not-exists-error";

interface DeleteCategoryRequest{
    user_id: string;
    name: string;

}

export async function DeleteCategoryUseCase({user_id, name}:DeleteCategoryRequest){

    const userFound = await prisma.user.findUnique({
        where:{
            id: user_id
        }
    })

    if(!userFound){
        throw new ResourceNotFoundError()
    }

    const categoryFound = await prisma.category.findFirst({
        where:{
            name
        }
    })


    if(!categoryFound){
        throw new CategoryDoesNotExistsError()
    }

    const { id } = categoryFound


    const category= await prisma.category.delete({
        where:{
            id,

          }
    })

    return{
        category
    }
}