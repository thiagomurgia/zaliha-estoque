import { Request, Response} from 'express'

import { GetAllSystemUsersService } from '../../../services/AdminUsersServices/GetAllUsersService'

class GetAllSystemUsersController{
  async handle(req: Request, res: Response){

    const user_id = req.user_id

    const getAllUsersService = new GetAllSystemUsersService()

    const users = await getAllUsersService.execute(user_id)


    return res.json(users)
  }
}

export { GetAllSystemUsersController }