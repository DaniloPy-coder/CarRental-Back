"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingController = void 0;
const CreateBookingService_1 = require("../../services/booking/CreateBookingService");
class CreateBookingController {
    async handle(req, res) {
        const userId = req.user_id;
        const { carId, pickupDate, returnDate } = req.body;
        if (!carId || !pickupDate || !returnDate) {
            return res.status(400).json({
                error: "carId, pickupDate e returnDate são obrigatórios",
            });
        }
        try {
            const service = new CreateBookingService_1.CreateBookingService();
            const booking = await service.execute({
                userId,
                carId,
                pickupDate: new Date(pickupDate),
                returnDate: new Date(returnDate),
            });
            return res.status(201).json(booking);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.CreateBookingController = CreateBookingController;
