"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateCarService {
    async execute({ id, ownerId, ...updateData }) {
        const car = await prisma_1.default.car.findUnique({
            where: { id },
        });
        if (!car) {
            throw new Error("Carro não encontrado");
        }
        if (car.ownerId !== ownerId) {
            throw new Error("Sem permissão para editar este carro");
        }
        const data = {
            ...updateData,
            year: updateData.year ? Number(updateData.year) : undefined,
            seatingCapacity: updateData.seatingCapacity
                ? Number(updateData.seatingCapacity)
                : undefined,
            pricePerDay: updateData.pricePerDay
                ? Number(updateData.pricePerDay)
                : undefined,
        };
        const updatedCar = await prisma_1.default.car.update({
            where: { id },
            data,
        });
        return updatedCar;
    }
}
exports.UpdateCarService = UpdateCarService;
