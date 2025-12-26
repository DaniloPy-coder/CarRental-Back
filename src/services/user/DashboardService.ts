import prismaClient from "../../prisma";

class DashboardService {
    async execute(userId: string) {
        const totalCars = await prismaClient.car.count({
            where: { ownerId: userId },
        });

        const totalBookings = await prismaClient.booking.count({
            where: { car: { ownerId: userId } },
        });

        const pendingBookings = await prismaClient.booking.count({
            where: { status: "PENDING", car: { ownerId: userId } },
        });

        const completedBookings = await prismaClient.booking.count({
            where: { status: "CONFIRMED", car: { ownerId: userId } },
        });

        const recentBookings = await prismaClient.booking.findMany({
            where: { car: { ownerId: userId } },
            orderBy: { createdAt: "desc" },
            take: 5,
            include: { car: true, user: true },
        });

        const cars = await prismaClient.car.findMany({
            where: { ownerId: userId },
        });

        const revenueData = await prismaClient.booking.aggregate({
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

export { DashboardService };

