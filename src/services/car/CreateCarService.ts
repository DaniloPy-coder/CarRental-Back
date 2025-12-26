import prismaClient from "../../prisma";

interface CarRequest {
    ownerId: string;
    brand: string;
    model: string;
    image: string;
    year: number;
    category: string;
    seatingCapacity: number;
    fuelType: string;
    transmission: string;
    pricePerDay: number;
    location: string;
    description: string;
}

class CreateCarService {
    async execute({
        ownerId,
        brand,
        model,
        image,
        year,
        category,
        seatingCapacity,
        fuelType,
        transmission,
        pricePerDay,
        location,
        description,
    }: CarRequest) {
        console.log("DADOS RECEBIDOS NO SERVICE:", {
            ownerId,
            brand,
            model,
            image,
            year,
            category,
            seatingCapacity,
            fuelType,
            transmission,
            pricePerDay,
            location,
            description
        });


        const car = await prismaClient.car.create({
            data: {
                ownerId,
                brand,
                model,
                image,
                year,
                category,
                seatingCapacity,
                fuelType,
                transmission,
                pricePerDay,
                location,
                description,
            },
        });

        return car;
    }
}

export { CreateCarService };
