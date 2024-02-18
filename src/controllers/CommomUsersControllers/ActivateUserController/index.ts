import { Request, Response } from "express";
import { ActivateUserService } from "../../../services/CommomUsersServices/ActivateUserService";



class ActivateUserController {
  async handle(req: Request, res: Response) {
    const { token_id } = req.params;

    const activateUserService = new ActivateUserService()

    const user = await activateUserService.execute({
      token_id
    })


    return res.status(201).json(user)
  }
}

export {ActivateUserController}