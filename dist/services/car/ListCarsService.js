"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCarsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListCarsService {
    async execute() {
        const cars = await prisma_1.default.car.findMany({
            select: {
                id: true,
                brand: true,
                model: true,
                image: true,
                year: true,
                category: true,
                seatingCapacity: true,
                fuelType: true,
                transmission: true,
                pricePerDay: true,
                location: true,
                description: true,
                isAvailable: true,
                createdAt: true,
                updatedAt: true,
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return cars;
    }
}
exports.ListCarsService = ListCarsService;
