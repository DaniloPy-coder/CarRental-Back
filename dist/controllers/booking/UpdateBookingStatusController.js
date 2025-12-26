"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookingStatusController = void 0;
const UpdateBookingStatusService_1 = require("../../services/booking/UpdateBookingStatusService");
class UpdateBookingStatusController {
    async handle(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        const userId = req.user_id;
        if (!status) {
            return res.status(400).json({ error: "Status é obrigatório" });
        }
        try {
            const service = new UpdateBookingStatusService_1.UpdateBookingStatusService();
            const booking = await service.execute({ bookingId: id, status, userId });
            return res.json({ success: true, message: "Status atualizado", booking });
        }
        catch (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}
exports.UpdateBookingStatusController = UpdateBookingStatusController;
