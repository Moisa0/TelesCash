import  {Router} from 'express'
import { register } from "./controllers/register.controller";
import { createCategory } from './controllers/create-category';

const router = Router()


router.post('/users', register)


//AUTHENTICATION REQUIRED
router.post('/category', createCategory)

export default router

