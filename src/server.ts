
import express from 'express';
import router from './http/routes';


import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { env } from './env';



const server = express()
server.use(express.json())


server.use('/', router)


server.listen(
    env.PORT, ()=>{
        console.log("🚀 HTTP Server Running!")
    }
)

//---------------------------------------FORMATAR OS ERROS VINDOS DO ZOD
server.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  console.error('🔥 Erro capturado pelo middleware:', error)

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.format() // Bem estruturado, útil para frontends
    });
  }
  

  return res.status(500).json({ message: 'Internal server error' });
});