import { Request, Response } from "express";
import { ListUserBookingsService } from "../../services/booking/ListUserBookingsService";

class ListUserBookingsController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;

        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        try {
            const service = new ListUserBookingsService();
            const bookings = await service.execute(userId);

            return res.status(200).json({ bookings });
        } catch (err: any) {
            console.error("Erro ao listar reservas:", err);
            return res.status(500).json({ error: err.message });
        }
    }
}

export { ListUserBookingsController };
