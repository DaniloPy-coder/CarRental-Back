"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookingStatusService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateBookingStatusService {
    async execute({ bookingId, status, userId }) {
        const statusMap = {
            pendente: "PENDING",
            confirmado: "CONFIRMED",
            cancelado: "CANCELLED",
        };
        const prismaStatus = statusMap[status];
        if (!prismaStatus) {
            throw new Error("Status inválido");
        }
        const booking = await prisma_1.default.booking.findUnique({
            where: { id: bookingId },
            include: { car: true },
        });
        if (!booking) {
            throw new Error("Reserva não encontrada");
        }
        if (booking.car.ownerId !== userId) {
            throw new Error("Você não tem permissão para alterar esta reserva");
        }
        const updatedBooking = await prisma_1.default.booking.update({
            where: { id: bookingId },
            data: { status: prismaStatus },
            include: { car: true },
        });
        const reverseStatusMap = {
            PENDING: "pendente",
            CONFIRMED: "confirmado",
            CANCELLED: "cancelado",
        };
        return {
            ...updatedBooking,
            status: reverseStatusMap[updatedBooking.status],
        };
    }
}
exports.UpdateBookingStatusService = UpdateBookingStatusService;
