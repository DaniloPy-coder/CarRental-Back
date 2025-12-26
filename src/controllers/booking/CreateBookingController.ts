import { Request, Response } from "express";
import { CreateBookingService } from "../../services/booking/CreateBookingService";

class CreateBookingController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;
        const { carId, pickupDate, returnDate } = req.body;

        if (!carId || !pickupDate || !returnDate) {
            return res.status(400).json({
                error: "carId, pickupDate e returnDate são obrigatórios",
            });
        }

        try {
            const service = new CreateBookingService();
            const booking = await service.execute({
                userId,
                carId,
                pickupDate: new Date(pickupDate),
                returnDate: new Date(returnDate),
            });

            return res.status(201).json(booking);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { CreateBookingController };
