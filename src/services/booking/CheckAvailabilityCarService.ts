import prismaClient from "../../prisma";

interface CheckAvailabilityRequest {
    pickupDate: string;
    returnDate: string;
    location: string;
}

class CheckAvailabilityCarsService {
    async execute({ pickupDate, returnDate, location }: CheckAvailabilityRequest) {

        const cars = await prismaClient.car.findMany({
            where: {
                location: {
                    contains: location,
                    mode: "insensitive",
                },
            },
            include: {
                bookings: true,
            },
        });

        const availableCars = cars.filter((car) => {
            const overlapping = car.bookings.some((booking) => {
                if (booking.status !== "CONFIRMED") return false;

                return (
                    new Date(booking.pickupDate) <= new Date(returnDate) &&
                    new Date(booking.returnDate) >= new Date(pickupDate)
                );
            });

            return !overlapping;
        });

        return availableCars;
    }
}

export { CheckAvailabilityCarsService };
