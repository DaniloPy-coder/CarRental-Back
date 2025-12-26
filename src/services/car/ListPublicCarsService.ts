import prismaClient from "../../prisma";

export class ListPublicCarsService {
    async execute(location?: string) {
        const query: any = { isAvailable: true };

        if (location) {
            query.location = location;
        }

        const cars = await prismaClient.car.findMany({
            where: query,
            orderBy: { createdAt: "desc" },
        });

        return cars;
    }
}
