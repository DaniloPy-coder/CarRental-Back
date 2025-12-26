import { Request, Response } from "express";
import { CheckAvailabilityCarsService } from "../../services/booking/CheckAvailabilityCarService";

class CheckAvailabilityCarController {
    async handle(req: Request, res: Response) {
        const { pickupDate, returnDate, location } = req.query;

        if (!pickupDate || !returnDate || !location) {
            return res.status(400).json({ error: "pickupDate, returnDate e location são obrigatórios" });
        }

        try {
            const service = new CheckAvailabilityCarsService();
            const availability = await service.execute({
                pickupDate: pickupDate as string,
                returnDate: returnDate as string,
                location: location as string,
            });

            return res.json({ success: true, cars: availability });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}

export { CheckAvailabilityCarController };
