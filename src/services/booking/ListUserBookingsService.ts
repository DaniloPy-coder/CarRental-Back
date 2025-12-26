import prismaClient from "../../prisma";

interface IExecute {
    userId: string;
}

class ListUserBookingsService {
    async execute(userId: string) {
        const bookings = await prismaClient.booking.findMany({
            where: { userId },
            include: {
                car: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return bookings;
    }
}

export { ListUserBookingsService };
