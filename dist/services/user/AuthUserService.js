"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../../prisma"));
class AuthUserService {
    async execute({ email, password }) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret not defined.");
        }
        const user = await prisma_1.default.user.findFirst({
            where: { email },
        });
        if (!user) {
            throw new Error("User/password incorrect");
        }
        const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (!passwordMatch) {
            throw new Error("User/password incorrect");
        }
        const token = (0, jsonwebtoken_1.sign)({ name: user.name, email: user.email }, process.env.JWT_SECRET, { subject: user.id, expiresIn: "30d" });
        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token,
        };
    }
}
exports.AuthUserService = AuthUserService;
