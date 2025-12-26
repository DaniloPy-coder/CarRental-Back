"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAvailabilityCarsController = void 0;
const CheckAvailabilityCarsService_1 = require("../../services/booking/CheckAvailabilityCarsService");
class CheckAvailabilityCarsController {
    async handle(req, res) {
        const { pickupDate, returnDate, location } = req.query;
        if (!pickupDate || !returnDate || !location) {
            return res.status(400).json({ error: "pickupDate, returnDate e location são obrigatórios" });
        }
        try {
            const service = new CheckAvailabilityCarsService_1.CheckAvailabilityCarsService();
            const cars = await service.execute({
                pickupDate: pickupDate,
                returnDate: returnDate,
                location: location,
            });
            return res.json({ success: true, cars });
        }
        catch (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}
exports.CheckAvailabilityCarsController = CheckAvailabilityCarsController;
