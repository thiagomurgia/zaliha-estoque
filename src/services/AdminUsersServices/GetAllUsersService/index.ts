import { prismaClient } from "../../../prisma/prisma"

class GetAllSystemUsersService{
  async execute(user_id: string){

    const user = await prismaClient.user.findFirst({
      where:{
        id: user_id
      }
    })

    const userProfileLevel = user.userProfile.toString()

    if(!user){
      throw new Error('User not found')
    }else if( userProfileLevel !== '200' || userProfileLevel === null){
      throw new Error('User not have permission to execute this route')
    }

    const users = await prismaClient.user.findMany({
      select:{
        id: true,
        name: true,
        email: true,
        picProfile: true,
        userIsActive: true,
        userProfile: true,
        userXP: true,
      }
    })

    return users

  }
}

export { GetAllSystemUsersService }