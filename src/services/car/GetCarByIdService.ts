import prismaClient from "../../prisma";

class GetCarByIdService {
    async execute(carId: string) {
        if (!carId) throw new Error("ID do carro não informado");

        const car = await prismaClient.car.findFirst({
            where: { id: carId },
            include: {
                bookings: true
            }
        });

        if (!car) throw new Error("Carro não encontrado");

        return car;
    }
}

export { GetCarByIdService };
