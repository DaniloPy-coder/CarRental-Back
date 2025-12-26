import { Request, Response } from "express";
import { ListPublicCarsService } from "../../services/car/ListPublicCarsService";

class ListPublicCarsController {
    async handle(req: Request, res: Response) {
        try {
            const { location } = req.query;

            const service = new ListPublicCarsService();
            const cars = await service.execute(location as string | undefined);

            return res.json({
                success: true,
                cars: cars || [],
            });
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }
    }
}

export { ListPublicCarsController };
