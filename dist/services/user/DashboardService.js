"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DashboardService {
    async execute(userId) {
        const totalCars = await prisma_1.default.car.count({
            where: { ownerId: userId },
        });
        const totalBookings = await prisma_1.default.booking.count({
            where: { car: { ownerId: userId } },
        });
        const pendingBookings = await prisma_1.default.booking.count({
            where: { status: "PENDING", car: { ownerId: userId } },
        });
        const completedBookings = await prisma_1.default.booking.count({
            where: { status: "CONFIRMED", car: { ownerId: userId } },
        });
        const recentBookings = await prisma_1.default.booking.findMany({
            where: { car: { ownerId: userId } },
            orderBy: { createdAt: "desc" },
            take: 5,
            include: { car: true, user: true },
        });
        const cars = await prisma_1.default.car.findMany({
            where: { ownerId: userId },
        });
        const revenueData = await prisma_1.default.booking.aggregate({
            where: { status: "CONFIRMED", car: { ownerId: userId } },
            _sum: { price: true },
        });
        const monthlyRevenue = revenueData._sum.price || 0;
        return {
            totalCars,
            totalBookings,
            pendingBookings,
            completedBookings,
            recentBookings,
            monthlyRevenue,
            cars,
        };
    }
}
exports.DashboardService = DashboardService;
