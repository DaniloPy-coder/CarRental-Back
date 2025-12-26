"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAvailabilityCarsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CheckAvailabilityCarsService {
    async execute({ pickupDate, returnDate, location }) {
        const cars = await prisma_1.default.car.findMany({
            where: {
                location: {
                    contains: location,
                    mode: "insensitive",
                },
            },
            include: {
                bookings: true,
            },
        });
        const availableCars = cars.filter((car) => {
            const overlapping = car.bookings.some((booking) => {
                if (booking.status !== "CONFIRMED")
                    return false;
                return (new Date(booking.pickupDate) <= new Date(returnDate) &&
                    new Date(booking.returnDate) >= new Date(pickupDate));
            });
            return !overlapping;
        });
        return availableCars;
    }
}
exports.CheckAvailabilityCarsService = CheckAvailabilityCarsService;
