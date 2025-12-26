import { Request, Response } from "express";
import { ListOwnerCarsService } from "../../services/car/ListOwnerCarsService";

class ListOwnerCarsController {
    async handle(req: Request, res: Response) {
        try {
            const ownerId = req.user_id;

            const service = new ListOwnerCarsService();
            const cars = await service.execute(ownerId);

            return res.json({
                success: true,
                cars
            });

        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: err.message || "Erro ao listar carros do proprietário",
            });
        }
    }
}

export { ListOwnerCarsController };
