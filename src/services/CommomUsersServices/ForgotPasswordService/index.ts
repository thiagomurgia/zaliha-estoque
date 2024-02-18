import {prismaClient} from '../../../prisma/prisma'
import { sendEmailToChangePassword } from '../../../utlis/sendEmailToChangePassword'

interface AuthUserRequest {
  email: string,
}

class ForgotPasswordService {
  async execute({email}: AuthUserRequest){
    if(!email){
      throw new Error("Usuário não informado!")
    }

    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    const userIsActive = user.userIsActive

    if(!user || userIsActive === false){
      throw new Error("Usuário inválidos")
    }

    let token: number

    token = Math.floor(Math.random() * 12345) + 999999;

    await prismaClient.user.update({
      where:{
        email: email
      }, data:{
        tokenToRedefinePassword: token
      }
    })

    await sendEmailToChangePassword(user.email, user.name, token)

    return token
  }
}

export { ForgotPasswordService }