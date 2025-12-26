import { Request, Response } from "express";
import { UpdateBookingStatusService } from "../../services/booking/UpdateBookingStatusService";

class UpdateBookingStatusController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;
        const userId = req.user_id;

        if (!status) {
            return res.status(400).json({ error: "Status é obrigatório" });
        }

        try {
            const service = new UpdateBookingStatusService();
            const booking = await service.execute({ bookingId: id, status, userId });
            return res.json({ success: true, message: "Status atualizado", booking });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}

export { UpdateBookingStatusController };
