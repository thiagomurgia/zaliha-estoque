import { Request, Response } from "express";

import { ForgotPasswordService } from "../../../services/CommomUsersServices/ForgotPasswordService";

class ForgotPasswordController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;

    const forgotPasswordService = new ForgotPasswordService()

    const user = await forgotPasswordService.execute({
      email,
    })
    return res.status(201).end()
  }
}

export { ForgotPasswordController }