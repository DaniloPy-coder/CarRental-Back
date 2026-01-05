"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOwnerBookingsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListOwnerBookingsService {
    async execute(userId) {
        const bookings = await prisma_1.default.booking.findMany({
            where: {
                car: {
                    ownerId: userId,
                },
            },
            include: {
                car: true,
            },
        });
        const statusMap = {
            PENDING: "pendente",
            CONFIRMED: "confirmado",
            CANCELLED: "cancelado",
        };
        return bookings.map((booking) => ({
            ...booking,
            status: statusMap[booking.status],
        }));
    }
}
exports.ListOwnerBookingsService = ListOwnerBookingsService;
