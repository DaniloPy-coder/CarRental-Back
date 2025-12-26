import prismaClient from '../../prisma'
export class ChangeUserRoleService {
    async execute(userId: string) {
        const user = await prismaClient.user.findUnique({
            where: { id: userId },
        })

        if (!user) throw new Error('Usuário não encontrado')

        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: {
                role: "owner",
            },
        })

        return updatedUser
    }
}
