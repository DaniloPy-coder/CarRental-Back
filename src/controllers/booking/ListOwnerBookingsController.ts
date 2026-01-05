import { Request, Response } from "express";
import { ListOwnerBookingsService } from "../../services/booking/ListOwnerBookingsService";

class ListOwnerBookingsController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;

        const service = new ListOwnerBookingsService();
        const bookings = await service.execute(userId);

        return res.json({ success: true, bookings });
    }
}

export { ListOwnerBookingsController };
