import prismaClient from "../../prisma";

interface CheckAvailabilityRequest {
    pickupDate: string;
    returnDate: string;
    location: string;
}

class CheckAvailabilityCarsService {
    async execute({ pickupDate, returnDate, location }: CheckAvailabilityRequest) {
        const pickup = new Date(pickupDate + "T00:00:00");
        const dropoff = new Date(returnDate + "T23:59:59");

        const cars = await prismaClient.car.findMany({
            where: {
                location,
                isAvailable: true,
            },
            include: {
                bookings: {
                    where: {
                        status: "CONFIRMED"
                    }
                }
            }
        });

        const availableCars = cars.filter(car => {
            const hasConflict = car.bookings.some(booking =>
                new Date(booking.pickupDate) <= dropoff &&
                new Date(booking.returnDate) >= pickup
            );

            return !hasConflict;
        });

        return availableCars;
    }
}

export { CheckAvailabilityCarsService };
