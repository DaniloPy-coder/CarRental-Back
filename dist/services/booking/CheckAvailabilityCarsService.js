"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAvailabilityCarsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CheckAvailabilityCarsService {
    async execute({ pickupDate, returnDate, location }) {
        const pickup = new Date(pickupDate + "T00:00:00");
        const dropoff = new Date(returnDate + "T23:59:59");
        const cars = await prisma_1.default.car.findMany({
            where: {
                location,
                isAvailable: true,
            },
            include: {
                bookings: {
                    where: {
                        status: "CONFIRMED"
                    }
                }
            }
        });
        const availableCars = cars.filter(car => {
            const hasConflict = car.bookings.some(booking => new Date(booking.pickupDate) <= dropoff &&
                new Date(booking.returnDate) >= pickup);
            return !hasConflict;
        });
        return availableCars;
    }
}
exports.CheckAvailabilityCarsService = CheckAvailabilityCarsService;
