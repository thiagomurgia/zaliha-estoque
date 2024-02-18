import { Request, Response } from "express";

import { AuthenticateWithoutPasswordService } from "../../../services/CommomUsersServices/AuthenticateWithoutPasswordService";

class AuthenticateWithoutPasswordController {
  async handle(req: Request, res: Response) {
    const { email, tokenpass } = req.body;

    const authenticateWithoutPasswordService = new AuthenticateWithoutPasswordService()

    const user = await authenticateWithoutPasswordService.execute({
      email,
      tokenpass
    })

    if(!user){
      return res.send("Error")
    }

    return res.status(201).json(user)
  }
}

export { AuthenticateWithoutPasswordController }