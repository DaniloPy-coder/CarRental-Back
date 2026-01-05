import prismaClient from "../../prisma";

class ListOwnerBookingsService {
    async execute(userId: string) {
        const bookings = await prismaClient.booking.findMany({
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
        } as const;

        return bookings.map((booking) => ({
            ...booking,
            status: statusMap[booking.status],
        }));
    }
}

export { ListOwnerBookingsService };
