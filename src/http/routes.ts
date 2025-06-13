import  {Router} from 'express'
import { registerController } from "./controllers/register-controller";
import { createCategoryController } from './controllers/create-category-controller';
import { authenticationController } from './controllers/authentication-controller';
import { getUserProfileController } from './controllers/get-user-profile-controller';
import { authenticationMiddleware } from '../middlewares/authenticationMid';
import { createTransactionController } from './controllers/create-transaction-controller';
import { getTransactionsController } from './controllers/get-transactions';
import { getCategoriesController } from './controllers/get-categories';

const router = Router()



//AUTHENTICATION NOT REQUIRED ROUTES
router.post('/register', registerController)
router.post('/login', authenticationController)





//AUTHENTICATION
router.use(authenticationMiddleware)




//AUTHENTICATION REQUIRED ROUTES
router.post('/category',createCategoryController)
router.get('/me', getUserProfileController)
router.post('/transaction',createTransactionController)
router.get('/transaction',getTransactionsController)
router.get('/category',getCategoriesController)

export default router

