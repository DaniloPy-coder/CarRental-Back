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
            const availability = await service.execute({
                carId: carId,
                pickupDate: new Date(pickupDate),
                returnDate: new Date(returnDate),
            });
            return res.json(availability);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.CheckAvailabilityCarController = CheckAvailabilityCarController;
