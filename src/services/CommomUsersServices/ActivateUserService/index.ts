import { prismaClient } from '../../../prisma/prisma'


interface ActivateUserRequest {
  token_id: string,
}

class ActivateUserService {
  async execute({token_id}: ActivateUserRequest) {

    if(!token_id){
      throw new Error("Nome, email ou password não informado!")
    }


    const tokenAlreadyExistis = await prismaClient.user.findFirst({
      where:{
        emailTokenTActivate: token_id
      }
    })

    const email = tokenAlreadyExistis.email

    if(!tokenAlreadyExistis || tokenAlreadyExistis.emailTokenTActivate !== token_id){
      throw new Error("Usuário inválido")
    }

    const updateUserIsActive = await prismaClient.user.update({
      where:{
        email: email
      },
      data:{
        userIsActive: true
      }
    })


    return
  }
}

export { ActivateUserService }