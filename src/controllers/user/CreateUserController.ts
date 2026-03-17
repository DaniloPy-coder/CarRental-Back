import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";
class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw {
        statusCode: 400,
        message: "Missing required fields",
      };
    }

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  }
}

export { CreateUserController };
