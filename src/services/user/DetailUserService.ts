import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            throw new Error("User not found")
        }

        return user;
    }
}
export { DetailUserService };