import dotenv from 'dotenv'
import 'express-async-errors'
dotenv.config()
import cors from 'cors'
import path from 'path'

import express, {Request, Response, NextFunction} from 'express'
import { router } from './routes/routes'

const server = express()

server.use(express.json())

server.use(router)

server.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

server.use((err: Error, req: Request, res: Response, next: NextFunction)=>{

  if(err instanceof Error){
    return res.status(400).json({
      error: err.message
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})


const portRunning = process.env.PORT

server.listen(portRunning, ()=>{
  console.log(`Server is running! On port:${portRunning}`)
})