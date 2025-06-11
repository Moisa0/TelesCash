import { Transaction, Type } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CategoryDoesNotExistsError } from "./errors/category-does-not-exists-error";
import { TransactionTypeError } from "./errors/transaction-type-error";


interface CreateTransactionUseCaseRequest{

    name: string;
    amount: number;
    category: string;
    type: "credito"|"debito",
    user_id:string;

}

interface CreateTransactionUseCase{
    transactions: Transaction
}

export async function CreateTransactionUseCase({name, amount, category, type, user_id}:CreateTransactionUseCaseRequest){



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


    //ENCONTRAR CATEGORIA PELO ID DO USUÁRIO
    const categoryFound = await prisma.category.findFirst({
        where:{
            name:category,
            user_id
        }
    })
    //ERRO, CASO A CATEGORIA NÃO EXISTA
    if(!categoryFound){
        throw new CategoryDoesNotExistsError()
    }



    //ERRO, CASO NÃO TENHA TYPE OU SEJA INSERIDO INCORRETAMENTE
    if(type !== "credito" && type !=="debito"){
        throw new TransactionTypeError()
    }


    const updateWallet = type=="credito" ? userFound.wallet += amount : userFound.wallet -= amount
        await prisma.user.update({
            where:{
                id:user_id
            },
            data:{wallet:updateWallet}
        })



           const transaction= await prisma.transaction.create({
            data:{
                    name, 
                    amount, 
                    category, 
                    type, 
                    user_id
              }
        })


    
        return{
            transaction
        }
}