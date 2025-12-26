"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserBookingsController = void 0;
const ListUserBookingsService_1 = require("../../services/booking/ListUserBookingsService");
class ListUserBookingsController {
    async handle(req, res) {
        const userId = req.user_id;
        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        try {
            const service = new ListUserBookingsService_1.ListUserBookingsService();
            const bookings = await service.execute(userId);
            return res.status(200).json({ bookings });
        }
        catch (err) {
            console.error("Erro ao listar reservas:", err);
            return res.status(500).json({ error: err.message });
        }
    }
}
exports.ListUserBookingsController = ListUserBookingsController;
