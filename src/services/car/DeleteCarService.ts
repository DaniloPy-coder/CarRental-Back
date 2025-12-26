import prismaClient from "../../prisma";

class DeleteCarService {
    async execute(id: string, ownerId: string) {
        const car = await prismaClient.car.findUnique({
            where: { id },
        });

        if (!car) {
            throw new Error("Carro não encontrado");
        }

        if (car.ownerId !== ownerId) {
            throw new Error("Sem permissão para deletar este carro");
        }

        await prismaClient.car.delete({
            where: { id },
        });

        return { message: "Carro deletado com sucesso" };
    }
}

export { DeleteCarService };
