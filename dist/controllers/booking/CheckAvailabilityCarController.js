"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAvailabilityCarController = void 0;
const CheckAvailabilityCarService_1 = require("../../services/booking/CheckAvailabilityCarService");
class CheckAvailabilityCarController {
    async handle(req, res) {
        const { carId, pickupDate, returnDate } = req.query;
        if (!carId || !pickupDate || !returnDate) {
            return res.status(400).json({ error: "carId, pickupDate e returnDate são obrigatórios" });
        }
        try {
            const service = new CheckAvailabilityCarService_1.CheckAvailabilityCarService();
            const available = await service.execute({
                carId: carId,
                pickupDate: pickupDate,
                returnDate: returnDate,
            });
            return res.json({ success: true, available });
        }
        catch (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}
exports.CheckAvailabilityCarController = CheckAvailabilityCarController;
