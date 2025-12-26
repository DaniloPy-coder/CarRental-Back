"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateCarService {
    async execute({ ownerId, brand, model, image, year, category, seatingCapacity, fuelType, transmission, pricePerDay, location, description, }) {
        console.log("DADOS RECEBIDOS NO SERVICE:", {
            ownerId,
            brand,
            model,
            image,
            year,
            category,
            seatingCapacity,
            fuelType,
            transmission,
            pricePerDay,
            location,
            description
        });
        const car = await prisma_1.default.car.create({
            data: {
                ownerId,
                brand,
                model,
                image,
                year,
                category,
                seatingCapacity,
                fuelType,
                transmission,
                pricePerDay,
                location,
                description,
            },
        });
        return car;
    }
}
exports.CreateCarService = CreateCarService;
