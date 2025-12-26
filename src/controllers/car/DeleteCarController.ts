import { Request, Response } from "express";
import { DeleteCarService } from "../../services/car/DeleteCarService";

class DeleteCarController {
    async handle(req: Request, res: Response) {
        const ownerId = req.user_id;
        const { id } = req.params;

        const deleteCarService = new DeleteCarService();

        try {
            const result = await deleteCarService.execute(id, ownerId);

            return res.json({
                success: true,
                message: result.message
            });

        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export { DeleteCarController };
