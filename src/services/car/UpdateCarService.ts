import prismaClient from "../../prisma";

interface UpdateCarRequest {
    id: string;
    ownerId: string;
    brand?: string;
    model?: string;
    year?: number;
    category?: string;
    seatingCapacity?: number;
    fuelType?: string;
    transmission?: string;
    pricePerDay?: number;
    location?: string;
    description?: string;
    image?: string;
}

class UpdateCarService {
    async execute({
        id,
        ownerId,
        ...updateData
    }: UpdateCarRequest) {
        const car = await prismaClient.car.findUnique({
            where: { id },
        });

        if (!car) {
            throw new Error("Carro não encontrado");
        }

        if (car.ownerId !== ownerId) {
            throw new Error("Sem permissão para editar este carro");
        }

        const data = {
            ...updateData,
            year: updateData.year ? Number(updateData.year) : undefined,
            seatingCapacity: updateData.seatingCapacity
                ? Number(updateData.seatingCapacity)
                : undefined,
            pricePerDay: updateData.pricePerDay
                ? Number(updateData.pricePerDay)
                : undefined,
        };

        const updatedCar = await prismaClient.car.update({
            where: { id },
            data,
        });

        return updatedCar;
    }
}

export { UpdateCarService };
