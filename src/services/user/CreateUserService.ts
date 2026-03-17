import prismaClient from "../../prisma";
import { hash } from "bcrypt";

interface UserRequest {
  name: string;
  email: string;
  password: string;
  role?: "user" | "owner";
}

class CreateUserService {
  async execute({ name, email, password, role = "user" }: UserRequest) {
    try {
      if (!name || !email || !password) {
        throw {
          statusCode: 400,
          message: "Missing required fields",
        };
      }

      if (password.length < 6) {
        throw {
          statusCode: 400,
          message: "A senha deve ter no mínimo 6 caracteres",
        };
      }

      const normalizedEmail = email.toLowerCase().trim();

      const userAlreadyExists = await prismaClient.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

      if (userAlreadyExists) {
        throw {
          statusCode: 409,
          message: "User already exists",
        };
      }

      const passwordHash = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          name,
          email: normalizedEmail,
          password: passwordHash,
          role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      console.error(error);

      throw {
        statusCode: 500,
        message: "Error creating user",
      };
    }
  }
}

export { CreateUserService };
