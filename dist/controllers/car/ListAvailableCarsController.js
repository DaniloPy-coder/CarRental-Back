"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAvailableCarsController = void 0;
const ListAvailableCarsService_1 = require("../../services/car/ListAvailableCarsService");
class ListAvailableCarsController {
    async handle(req, res) {
        try {
            const { location } = req.query;
            const service = new ListAvailableCarsService_1.ListAvailableCarsService();
            const cars = await service.execute(location);
            return res.json({
                success: true,
                availableCars: cars || [],
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }
    }
}
exports.ListAvailableCarsController = ListAvailableCarsController;
