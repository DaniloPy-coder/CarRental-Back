import { Request, Response } from "express";
import { CheckAvailabilityCarsService } from "../../services/booking/CheckAvailabilityCarsService";

class CheckAvailabilityCarsController {
    async handle(req: Request, res: Response) {
        const { pickupDate, returnDate, location } = req.query;

        if (!pickupDate || !returnDate || !location) {
            return res.status(400).json({
                success: false,
                message: "pickupDate, returnDate e location são obrigatórios",
            });
        }

        try {
            const service = new CheckAvailabilityCarsService();

            const availableCars = await service.execute({
                pickupDate: pickupDate as string,
                returnDate: returnDate as string,
                location: location as string,
            });

            return res.json({
                success: true,
                availableCars,
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
}

export { CheckAvailabilityCarsController };
