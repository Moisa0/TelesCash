import { Category } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface GetCategoriesRequest{

    user_id:string;

}

interface GetCategoriesUseCase{
    categories: Category
}

export async function GetCategoriesUseCase({user_id}:GetCategoriesRequest){



    //ENCONTRAR USUÁRIO PELO ID
    const userFound = await prisma.user.findUnique({
        where:{
            id: user_id
        }
    })
    //ERRO, CASO O USUÁRIO NÃO EXISTA
    if(!userFound){
        throw new ResourceNotFoundError()
    }

    
        const categoriesFound = await prisma.category.findMany({
            where:{
                user_id
            }
        })

        const categories = categoriesFound.map((categoria) => categoria.name);
    
        return{
            categories
        }





}