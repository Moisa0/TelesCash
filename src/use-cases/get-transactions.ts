import { Transaction, Type } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CategoryDoesNotExistsError } from "./errors/category-does-not-exists-error";
import { TransactionTypeError } from "./errors/transaction-type-error";


interface GetTransactionRequest{

    user_id:string;

}

interface GetTransactionsUseCase{
    transactions: Transaction
}

export async function GetTransactionsUseCase({user_id}:GetTransactionRequest){



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

    //ENCONTRAR TRANSAÇÕES PELO ID DO USUÁRIO
    const transactionsFound = await prisma.transaction.findMany({
        where:{
            user_id
        }
    })
    
        return{
            transactionsFound
        }
}