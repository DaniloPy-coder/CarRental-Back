import { Request, Response } from "express";
import { ListAvailableCarsService } from "../../services/car/ListAvailableCarsService";

class ListAvailableCarsController {
    async handle(req: Request, res: Response) {
        try {
            const { location } = req.query;

            const service = new ListAvailableCarsService();
            const cars = await service.execute(location as string | undefined);

            return res.json({
                success: true,
                availableCars: cars || [],
            });
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }
    }
}

export { ListAvailableCarsController };
