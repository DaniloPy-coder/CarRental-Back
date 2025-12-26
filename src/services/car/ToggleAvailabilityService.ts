import prismaClient from "../../prisma";

class ToggleAvailabilityService {
    async execute(id: string, ownerId: string) {
        const car = await prismaClient.car.findUnique({ where: { id } });

        if (!car) {
            throw new Error("Carro não encontrado");
        }

        if (car.ownerId !== ownerId) {
            throw new Error("Você não tem permissão para alterar este carro");
        }

        const updated = await prismaClient.car.update({
            where: { id },
            data: { isAvailable: !car.isAvailable },
        });

        return updated;
    }
}

export { ToggleAvailabilityService };
