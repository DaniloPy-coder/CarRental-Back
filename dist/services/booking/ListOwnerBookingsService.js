"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOwnerBookingsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListOwnerBookingsService {
    async execute(ownerId) {
        const bookings = await prisma_1.default.booking.findMany({
            where: { ownerId },
            include: {
                car: true,
                user: true,
            },
            orderBy: {
                pickupDate: "desc",
            },
        });
        return bookings;
    }
}
exports.ListOwnerBookingsService = ListOwnerBookingsService;
