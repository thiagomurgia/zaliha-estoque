import {prismaClient} from '../../../prisma/prisma'
import { sign } from 'jsonwebtoken'
import 'dotenv/config'

interface AuthUserRequest {
  email: string,
  tokenpass: number,
}

class AuthenticateWithoutPasswordService {
  async execute({email, tokenpass}: AuthUserRequest){
    if(!email || !tokenpass){
      throw new Error("Usuário ou token não informado!")
    }

    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })
    const tokenWithoutPass = user.tokenToRedefinePassword

    if(!user || !tokenpass){
      throw new Error("Usuário ou senha inválidos")
    }

    if(tokenWithoutPass.toString() !== tokenpass.toString()){
      throw new Error("Token inválido")
    }


    const doesUserIsActive = user.userIsActive.valueOf()

    if(!doesUserIsActive) {
      throw new Error("A conta não foi ativada")
    }

    const token = sign({
      name: user.name,
      email: user.email,
      email_token: user.emailTokenTActivate
    },
    process.env.SECRET_JWT,
    {
      subject: user.id,
      expiresIn:'1d'
    }
    
    )

    return { 
      token: token
    }

  }
}

export { AuthenticateWithoutPasswordService }