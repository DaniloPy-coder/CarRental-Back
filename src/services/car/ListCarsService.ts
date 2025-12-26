import prismaClient from "../../prisma";

class ListCarsService {
    async execute() {
        const cars = await prismaClient.car.findMany({
            select: {
                id: true,
                brand: true,
                model: true,
                image: true,
                year: true,
                category: true,
                seatingCapacity: true,
                fuelType: true,
                transmission: true,
                pricePerDay: true,
                location: true,
                description: true,
                isAvailable: true,
                createdAt: true,
                updatedAt: true,
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return cars;
    }
}

export { ListCarsService };
