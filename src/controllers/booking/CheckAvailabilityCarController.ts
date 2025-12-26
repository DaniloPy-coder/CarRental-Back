import { Request, Response } from "express";
import { CheckAvailabilityCarService } from "../../services/booking/CheckAvailabilityCarService";

class CheckAvailabilityCarController {
    async handle(req: Request, res: Response) {
        const { carId, pickupDate, returnDate } = req.query;

        if (!carId || !pickupDate || !returnDate) {
            return res.status(400).json({ error: "carId, pickupDate e returnDate são obrigatórios" });
        }

        try {
            const service = new CheckAvailabilityCarService();
            const available = await service.execute({
                carId: carId as string,
                pickupDate: pickupDate as string,
                returnDate: returnDate as string,
            });

            return res.json({ success: true, available });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}

export { CheckAvailabilityCarController };