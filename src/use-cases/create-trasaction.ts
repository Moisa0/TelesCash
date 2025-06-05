import { Transaction, Type } from "@prisma/client";


interface CreateTransactionRequest{

    name: string;
    amount: number;
    category: string;
    type: Type;

}

interface CreateTransactionResponse{
    transactions: Transaction
}