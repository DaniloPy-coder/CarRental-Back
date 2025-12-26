import prismaClient from "../../prisma";
import { hash } from "bcrypt";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    role?: "user" | "owner"
}

class CreateUserService {
    async execute({ name, email, password, role = "user" }: UserRequest) {

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await prismaClient.user.findUnique({
            where: {
                email: email
            },
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
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

        return user
    }
}

export { CreateUserService };