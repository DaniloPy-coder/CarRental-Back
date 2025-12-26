"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = require("bcrypt");
class CreateUserService {
    async execute({ name, email, password, role = "user" }) {
        if (!email) {
            throw new Error("Email incorrect");
        }
        const userAlreadyExists = await prisma_1.default.user.findUnique({
            where: {
                email: email
            },
        });
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }
        const passwordHash = await (0, bcrypt_1.hash)(password, 8);
        const user = await prisma_1.default.user.create({
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
        return user;
    }
}
exports.CreateUserService = CreateUserService;
