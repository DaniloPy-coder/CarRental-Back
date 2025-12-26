"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAvailabilityCarService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CheckAvailabilityCarService {
    async execute({ carId, pickupDate, returnDate }) {
        const car = await prisma_1.default.car.findUnique({
            where: { id: carId },
            include: { bookings: true },
        });
        if (!car) {
            throw new Error("Carro não encontrado");
        }
        const overlapping = car.bookings.some((booking) => {
            if (booking.status !== "CONFIRMED")
                return false;
            return (new Date(booking.pickupDate) <= new Date(returnDate) &&
                new Date(booking.returnDate) >= new Date(pickupDate));
        });
        return !overlapping; // true = disponível, false = ocupado
    }
}
exports.CheckAvailabilityCarService = CheckAvailabilityCarService;
