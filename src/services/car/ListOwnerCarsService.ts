import prismaClient from "../../prisma";

class ListOwnerCarsService {
    async execute(ownerId: string) {
        return prismaClient.car.findMany({
            where: { ownerId },
            orderBy: { createdAt: "desc" }
        });
    }
}

export { ListOwnerCarsService };
