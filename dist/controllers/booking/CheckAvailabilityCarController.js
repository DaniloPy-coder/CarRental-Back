"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAvailabilityCarController = void 0;
const CheckAvailabilityCarService_1 = require("../../services/booking/CheckAvailabilityCarService");
class CheckAvailabilityCarController {
    async handle(req, res) {
        const { pickupDate, returnDate, location } = req.query;
        if (!pickupDate || !returnDate || !location) {
            return res.status(400).json({ error: "pickupDate, returnDate e location são obrigatórios" });
        }
        try {
            const service = new CheckAvailabilityCarService_1.CheckAvailabilityCarsService();
            const availability = await service.execute({
                pickupDate: pickupDate,
                returnDate: returnDate,
                location: location,
            });
            return res.json({ success: true, cars: availability });
        }
        catch (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}
exports.CheckAvailabilityCarController = CheckAvailabilityCarController;
