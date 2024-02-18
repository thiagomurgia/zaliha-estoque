import {prismaClient} from '../../../prisma/prisma'
import { hash } from 'bcrypt'

interface UpdateUserProfileRequest{
  name: string,
  password?: string,
  picProfile?: string
}

class UpdateUserProfileService {
  async execute(user_id: string,{
    name,
    password,
    picProfile}: UpdateUserProfileRequest){



    const user = await prismaClient.user.findFirst({
      where:{
        id:user_id
      }
    })

    if(!user){
      throw new Error('Usuário inválido')
    }

    const passwordHash = await hash(password, 10)

    await prismaClient.user.update({
      where:{
        id: user_id
      },
      data:{
        name: name,
        password: passwordHash,
        picProfile: picProfile
      },
      select:{
        email: true,
        name: true,
        picProfile: true,

      }
    })

    return user
  }
}

export {UpdateUserProfileService}