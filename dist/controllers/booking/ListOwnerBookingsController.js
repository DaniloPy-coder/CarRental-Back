"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOwnerBookingsController = void 0;
const ListOwnerBookingsService_1 = require("../../services/booking/ListOwnerBookingsService");
class ListOwnerBookingsController {
    async handle(req, res) {
        const userId = req.user_id;
        const service = new ListOwnerBookingsService_1.ListOwnerBookingsService();
        const bookings = await service.execute(userId);
        return res.json({ success: true, bookings });
    }
}
exports.ListOwnerBookingsController = ListOwnerBookingsController;
