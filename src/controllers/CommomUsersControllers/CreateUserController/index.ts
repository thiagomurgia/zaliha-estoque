import { Request, Response } from "express";

import { CreateUserService } from "../../../services/CommomUsersServices/CreateUserService";
import { sendEmailToActiveUser } from "../../../utlis/sendEmailToActiveUser";

interface sendEmailInterface{
  email: string,
  name: string,
  token_id: string
}

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({
      name,
      email,
      password
    })

    const token_id = user.emailTokenTActivate

    await sendEmailToActiveUser(email,name,token_id)


    return res.status(201).json(user)
  }

}

export {CreateUserController}