import  {Router} from 'express'
import { registerController } from "./controllers/register-controller";
import { createCategoryController } from './controllers/create-category-controller';
import { expressjwt } from 'express-jwt';
import { env } from '../env';
import { authenticationController } from './controllers/authentication-controller';
import { getUserProfileController } from './controllers/get-user-profile-controller';
import { authenticationMiddleware } from '../middlewares/authenticationMid';
import { createTransactionController } from './controllers/create-transaction-controller';

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

export default router

