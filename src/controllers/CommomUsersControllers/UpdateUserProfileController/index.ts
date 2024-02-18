import { Request, Response} from 'express'

import { UpdateUserProfileService } from '../../../services/CommomUsersServices/UpdateUserProfileService'

class UpdataProfileUserController{
  async handle(req: Request, res: Response){

    const user_id = req.user_id
    const {name, password} = req.body
    

    const updateUserProfileService = new UpdateUserProfileService()

    const {originalname, filename: picProfile} = req.file

    const user = await updateUserProfileService.execute(user_id,{name, password, picProfile})


    return res.json({
      name, picProfile
    })
  }
}

export {UpdataProfileUserController}