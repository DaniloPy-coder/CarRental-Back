"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPublicCarsController = void 0;
const ListPublicCarsService_1 = require("../../services/car/ListPublicCarsService");
class ListPublicCarsController {
    async handle(req, res) {
        try {
            const { location } = req.query;
            const service = new ListPublicCarsService_1.ListPublicCarsService();
            const cars = await service.execute(location);
            return res.json({
                success: true,
                cars: cars || [],
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }
    }
}
exports.ListPublicCarsController = ListPublicCarsController;
