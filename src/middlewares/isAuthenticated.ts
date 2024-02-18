import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  sub: string
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
){
  //pegando toke que sempre vem dentro do headers.authorization
  const authToken = req.headers.authorization


  if(!authToken){
    return res.status(401).end()
  }

  const [, token] = authToken.split(" ")

  try {
    //validar o token
    const { sub } = verify(
      token,
      process.env.SECRET_JWT
    ) as Payload

    //inserindo o id do token e colocar dentro de uma variavel user_id dentro do request
    req.user_id = sub

    return next()
  } catch (error) {
    return res.status(401).end()
  }

  next()
}