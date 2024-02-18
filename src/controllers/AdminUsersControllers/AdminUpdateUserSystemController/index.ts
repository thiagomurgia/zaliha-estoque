import { Request, Response} from 'express'

import { AdminUpdateUserSystyemService } from '../../../services/AdminUsersServices/AdminUpdateUserSystem'

class AdminUpdateUserSystyemController{
  async handle(req: Request, res: Response){

    const user_id = req.user_id
    const systemUser_id = req.params.systemUser_id as string
    const {name, email, picProfile, userIsActive, userProfile, userXP} = req.body
    

    const adminUpdateUserSystyemService = new AdminUpdateUserSystyemService()

    

    const user = await adminUpdateUserSystyemService.execute(user_id, systemUser_id, {name, email, picProfile, userIsActive, userProfile, userXP})


    return res.json({
      name,
      email,
      picProfile,
      userIsActive,
      userProfile,
      userXP
    })
  }
}

export {AdminUpdateUserSystyemController}