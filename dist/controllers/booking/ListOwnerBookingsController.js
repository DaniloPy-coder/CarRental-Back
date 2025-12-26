"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOwnerBookingsController = void 0;
const ListOwnerBookingsService_1 = require("../../services/booking/ListOwnerBookingsService");
class ListOwnerBookingsController {
    async handle(req, res) {
        const ownerId = req.user_id;
        try {
            const service = new ListOwnerBookingsService_1.ListOwnerBookingsService();
            const bookings = await service.execute(ownerId);
            return res.json({
                success: true,
                bookings,
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
}
exports.ListOwnerBookingsController = ListOwnerBookingsController;
