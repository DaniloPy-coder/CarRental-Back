import { Request, Response } from "express";
import { ListOwnerBookingsService } from "../../services/booking/ListOwnerBookingsService";

class ListOwnerBookingsController {
    async handle(req: Request, res: Response) {
        const ownerId = req.user_id;

        try {
            const service = new ListOwnerBookingsService();
            const bookings = await service.execute(ownerId);

            return res.json({
                success: true,
                bookings,
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
}

export { ListOwnerBookingsController };
