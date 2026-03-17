import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const authUserService = new AuthUserService();

      const { user, token } = await authUserService.execute({
        email,
        password,
      });

      return res.status(200).json({
        success: true,
        user,
        token,
      });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        error: error.message || "Internal server error",
      });
    }
  }
}

export { AuthUserController };
