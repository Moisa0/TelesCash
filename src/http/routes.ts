import  {Router} from 'express'
import { register } from "./controllers/register.controller";
import { createCategory } from './controllers/create-category';
import { expressjwt } from 'express-jwt';
import { env } from '../env';
import { authenticate } from './controllers/authenticate';

const router = Router()



//AUTHENTICATION NOT REQUIRED
router.post('/register', register)
router.post('/login', authenticate)



router.use(expressjwt({
    secret:env.JWT_SECRET,
    algorithms: ["HS256"],

}))



//AUTHENTICATION REQUIRED
router.post('/category', createCategory)

export default router

