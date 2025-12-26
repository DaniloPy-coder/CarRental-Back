"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeUserRoleService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ChangeUserRoleService {
    async execute(userId) {
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            throw new Error('Usuário não encontrado');
        const updatedUser = await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                role: "owner",
            },
        });
        return updatedUser;
    }
}
exports.ChangeUserRoleService = ChangeUserRoleService;
