"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserBookingsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListUserBookingsService {
    async execute(userId) {
        const bookings = await prisma_1.default.booking.findMany({
            where: { userId },
            include: {
                car: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return bookings;
    }
}
exports.ListUserBookingsService = ListUserBookingsService;
