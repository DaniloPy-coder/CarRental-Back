import prismaClient from "../../prisma";

interface CreateBookingRequest {
    userId: string;
    carId: string;
    pickupDate: Date;
    returnDate: Date;
}

class CreateBookingService {
    async execute({ userId, carId, pickupDate, returnDate }: CreateBookingRequest) {
        const car = await prismaClient.car.findUnique({ where: { id: carId } });
        if (!car) throw new Error("Carro não encontrado");

        const overlappingBooking = await prismaClient.booking.findFirst({
            where: {
                carId,
                status: "CONFIRMED",
                OR: [
                    {
                        pickupDate: { lte: returnDate },
                        returnDate: { gte: pickupDate },
                    },
                ],
            },
        });

        if (overlappingBooking) {
            throw new Error("Carro não disponível nesse período");
        }

        const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalPrice = diffDays * car.pricePerDay;

        const booking = await prismaClient.booking.create({
            data: {
                userId,
                ownerId: car.ownerId,
                carId,
                pickupDate,
                returnDate,
                price: totalPrice,
                status: "PENDING",
            },
        });

        return booking;
    }
}

export { CreateBookingService };
