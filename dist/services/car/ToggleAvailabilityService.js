"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleAvailabilityService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ToggleAvailabilityService {
    async execute(id, ownerId) {
        const car = await prisma_1.default.car.findUnique({ where: { id } });
        if (!car) {
            throw new Error("Carro não encontrado");
        }
        if (car.ownerId !== ownerId) {
            throw new Error("Você não tem permissão para alterar este carro");
        }
        const updated = await prisma_1.default.car.update({
            where: { id },
            data: { isAvailable: !car.isAvailable },
        });
        return updated;
    }
}
exports.ToggleAvailabilityService = ToggleAvailabilityService;
