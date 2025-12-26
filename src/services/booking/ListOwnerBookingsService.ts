import prismaClient from "../../prisma";

class ListOwnerBookingsService {
    async execute(ownerId: string) {
        const bookings = await prismaClient.booking.findMany({
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

export { ListOwnerBookingsService };
