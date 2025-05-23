import express from 'express';
import router, { appRoutes } from './http/routes';


export const app = express()
app.use(express.json())


app.use('/', router)

export default app


