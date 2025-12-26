"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCarService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteCarService {
    async execute(id, ownerId) {
        const car = await prisma_1.default.car.findUnique({
            where: { id },
        });
        if (!car) {
            throw new Error("Carro não encontrado");
        }
        if (car.ownerId !== ownerId) {
            throw new Error("Sem permissão para deletar este carro");
        }
        await prisma_1.default.car.delete({
            where: { id },
        });
        return { message: "Carro deletado com sucesso" };
    }
}
exports.DeleteCarService = DeleteCarService;
