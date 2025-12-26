import { Request, Response } from "express";
import { ListCarsService } from "../../services/car/ListCarsService";

class ListCarsController {
    async handle(req: Request, res: Response) {
        try {
            const listCarsService = new ListCarsService();

            const cars = await listCarsService.execute();

            return res.json({
                success: true,
                cars,
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: err.message || "Erro ao listar carros",
            });
        }
    }
}

export { ListCarsController };
