import { Transaction, Type } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface CreateTransactionRequest{

    name: string;
    amount: number;
    category: string;
    type: string;
    user_id:string;

}

interface CreateTransactionResponse{
    transactions: Transaction
}

export async function CreateTransactionUseCase({name, amount, category, type, user_id}:CreateTransactionRequest){
        const userFound = await prisma.user.findUnique({
            where:{
                id: user_id
            }
        })
    
        if(!userFound){
            throw new ResourceNotFoundError()
        }
    



        
    
           const transaction= await prisma.transaction.create({
            data:{
                    name, 
                    amount, 
                    category, 
                    type, 
                    user_id
              }
        })

        console.log(transaction)
    
        return{
            transaction
        }
}