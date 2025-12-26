"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCarByIdService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetCarByIdService {
    async execute(carId) {
        if (!carId)
            throw new Error("ID do carro não informado");
        const car = await prisma_1.default.car.findFirst({
            where: { id: carId },
            include: {
                bookings: true
            }
        });
        if (!car)
            throw new Error("Carro não encontrado");
        return car;
    }
}
exports.GetCarByIdService = GetCarByIdService;
