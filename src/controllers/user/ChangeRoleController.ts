import { Request, Response } from 'express'
import { ChangeUserRoleService } from '../../services/user/ChangeRoleService'

export class ChangeUserRoleController {
    async handle(req: Request, res: Response) {
        try {
            const userId = req.user_id

            const service = new ChangeUserRoleService()
            const user = await service.execute(userId)

            return res.json({
                success: true,
                message: 'Agora você é um OWNER!',
                user,
            })
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    }
}
