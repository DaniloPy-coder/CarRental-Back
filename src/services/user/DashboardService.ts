import prismaClient from "../../prisma";

class DashboardService {
  async execute(userId: string) {
    try {
      const ownerFilter = {
        ownerId: userId,
      };

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const [
        totalCars,
        totalBookings,
        pendingBookings,
        completedBookings,
        recentBookings,
        cars,
        revenueData,
      ] = await Promise.all([
        prismaClient.car.count({
          where: { ownerId: userId },
        }),

        prismaClient.booking.count({
          where: ownerFilter,
        }),

        prismaClient.booking.count({
          where: { ...ownerFilter, status: "PENDING" },
        }),

        prismaClient.booking.count({
          where: { ...ownerFilter, status: "CONFIRMED" },
        }),

        prismaClient.booking.findMany({
          where: ownerFilter,
          orderBy: { createdAt: "desc" },
          take: 5,
          include: {
            car: true,
            user: true,
          },
        }),

        prismaClient.car.findMany({
          where: { ownerId: userId },
          select: {
            id: true,
            model: true,
            brand: true,
          },
        }),

        prismaClient.booking.aggregate({
          where: {
            ...ownerFilter,
            status: "CONFIRMED",
            createdAt: { gte: startOfMonth },
          },
          _sum: { price: true },
        }),
      ]);

      return {
        totalCars,
        totalBookings,
        pendingBookings,
        completedBookings,
        recentBookings,
        monthlyRevenue: revenueData._sum.price || 0,
        cars,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao carregar dashboard");
    }
  }
}

export { DashboardService };
