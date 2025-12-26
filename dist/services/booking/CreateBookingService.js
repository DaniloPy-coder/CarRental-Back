"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateBookingService {
    async execute({ userId, carId, pickupDate, returnDate }) {
        const car = await prisma_1.default.car.findUnique({ where: { id: carId } });
        if (!car)
            throw new Error("Carro não encontrado");
        const overlappingBooking = await prisma_1.default.booking.findFirst({
            where: {
                carId,
                status: "CONFIRMED",
                OR: [
                    {
                        pickupDate: { lte: returnDate },
                        returnDate: { gte: pickupDate },
                    },
                ],
            },
        });
        if (overlappingBooking) {
            throw new Error("Carro não disponível nesse período");
        }
        const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalPrice = diffDays * car.pricePerDay;
        const booking = await prisma_1.default.booking.create({
            data: {
                userId,
                ownerId: car.ownerId,
                carId,
                pickupDate,
                returnDate,
                price: totalPrice,
                status: "PENDING",
            },
        });
        return booking;
    }
}
exports.CreateBookingService = CreateBookingService;
