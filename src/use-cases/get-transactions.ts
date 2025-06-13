import { Transaction, Type } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface GetTransactionsRequest{

    user_id:string;

    category?: string;

}

interface GetTransactionsUseCase{
    transactions: Transaction
}

export async function GetTransactionsUseCase({user_id, category}:GetTransactionsRequest){



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

    if(category){
        //ENCONTRAR TRANSAÇÕES PELO ID DO USUÁRIO
        const transactionsFound = await prisma.transaction.findMany({
            where:{
                user_id,
                category
            }
        })

        const transactions = transactionsFound.map(({ id, user_id, ...rest }) => rest);
        console.log(transactions)
    
        return{
            transactions
        }
    }



    
        const transactionsFound = await prisma.transaction.findMany({
            where:{
                user_id
            }
        })

        const transactions = transactionsFound.map(({ id, user_id, ...rest }) => rest);
        console.log(transactions)
    
        return{
            transactions
        }





}