import {prismaClient} from '../../../prisma/prisma'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import 'dotenv/config'

interface AuthUserRequest {
  email: string,
  password: string,
}

class AuthUserService {
  async execute({email, password}: AuthUserRequest){
    if(!email || !password){
      throw new Error("Usuário ou password não informado!")
    }

    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if(!user){
      throw new Error("Usuário ou senha inválidos")
    }

    const doesPasswodMatch = await compare(password, user.password)

    

    if(!doesPasswodMatch){
      throw new Error("Usuário ou senha inválidos")
    }

    const doesUserIsActive = user.userIsActive.valueOf()

    if(!doesUserIsActive) {
      throw new Error("A conta não foi ativada")
    }

    const token = sign({
      name: user.name,
      email: user.email,
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

export { AuthUserService}