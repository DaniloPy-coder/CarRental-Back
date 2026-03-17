import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    if (!process.env.JWT_SECRET) {
      throw {
        statusCode: 500,
        message: "JWT secret not defined",
      };
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prismaClient.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw {
        statusCode: 401,
        message: "User/password incorrect",
      };
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw {
        statusCode: 401,
        message: "User/password incorrect",
      };
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      },
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}

export { AuthUserService };
