import {prismaClient} from '../../../prisma/prisma'

interface UpdateAdminUserProfileRequest{
  name?: string,
  email?: string,
  picProfile?: string,
  userIsActive?: boolean,
  userProfile?: string,
  userXP?: number
}

class AdminUpdateUserSystyemService {
  async execute(user_id: string, systemUser_id: string,{
    name,
    email,
    picProfile,
    userIsActive,
    userProfile,
    userXP}: UpdateAdminUserProfileRequest){

      const administratorUser = await prismaClient.user.findFirst({
        where:{
          id: user_id
        }
      })

      if(administratorUser.userProfile !== '200'|| administratorUser.userIsActive === false){
        throw new Error('Unauthorized')
      } else{

        const user = await prismaClient.user.findFirst({
          where:{
            id:systemUser_id
          }
        })

        if(!user){
          throw new Error('User nott found')
        }
    
    
        const systemUser = await prismaClient.user.update({
          where:{
            id: systemUser_id
          },
          data:{
            name: name,
            email: email,
            picProfile: picProfile,
            userIsActive: userIsActive,
            userProfile: userProfile,
            userXP: userXP,
          },
          select:{
            name: true,
            email:true,
            picProfile: true,
            userIsActive: true,
            userProfile: true,
            userXP: true,
    
          }
        })
    
        return systemUser

      }
      

    
  }
}

export {AdminUpdateUserSystyemService}