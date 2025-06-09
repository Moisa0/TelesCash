export class TransactionTypeError extends Error {
    constructor(){
        super('Transaction type must be [credito] or [debito].')
    }
}