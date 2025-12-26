import prismaClient from "../../prisma";

interface CheckAvailabilityCarRequest {
    carId: string;
    pickupDate: string;
    returnDate: string;
}

class CheckAvailabilityCarService {
    async execute({ carId, pickupDate, returnDate }: CheckAvailabilityCarRequest) {
        const car = await prismaClient.car.findUnique({
            where: { id: carId },
            include: { bookings: true },
        });

        if (!car) {
            throw new Error("Carro não encontrado");
        }

        const overlapping = car.bookings.some((booking) => {
            if (booking.status !== "CONFIRMED") return false;

            return (
                new Date(booking.pickupDate) <= new Date(returnDate) &&
                new Date(booking.returnDate) >= new Date(pickupDate)
            );
        });

        return !overlapping; // true = disponível, false = ocupado
    }
}

export { CheckAvailabilityCarService };