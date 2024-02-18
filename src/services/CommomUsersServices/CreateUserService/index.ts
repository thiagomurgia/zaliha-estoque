import { prismaClient } from '../../../prisma/prisma'
import { hash } from 'bcrypt'

interface CreateUserRequest {
  name: string,
  email: string,
  password: string,
}

class CreateUserService {
  async execute({name, email, password}: CreateUserRequest) {

    if(!name || !email || !password){
      throw new Error("Nome, email ou password não informado!")
    }


    const usersAlreadyExistis = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if(usersAlreadyExistis){
      throw new Error("Usuário já cadastrado!")
    }

    const passwordHash = await hash(password, 10)

    const user = await prismaClient.user.create({
      data:{ 
        name,
        email, 
        password: passwordHash
      },
      select:{
        id: true,
        name: true,
        emailTokenTActivate: true
      }
    })

    return user
  }
}

export { CreateUserService }