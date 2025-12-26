import { Request, Response } from "express";
import { GetCarByIdService } from "../../services/car/GetCarByIdService";

class GetCarByIdController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const service = new GetCarByIdService();
            const car = await service.execute(id);

            return res.json({
                success: true,
                car
            });

        } catch (err: any) {
            return res.status(404).json({
                success: false,
                message: err.message || "Erro ao buscar carro",
            });
        }
    }
}

export { GetCarByIdController };
