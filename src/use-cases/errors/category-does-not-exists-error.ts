export class CategoryDoesNotExistsError extends Error {
    constructor(){
        super('Category does not exists.')
    }
}