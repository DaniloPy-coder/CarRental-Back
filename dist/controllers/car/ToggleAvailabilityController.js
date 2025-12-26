"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleAvailabilityController = void 0;
const ToggleAvailabilityService_1 = require("../../services/car/ToggleAvailabilityService");
class ToggleAvailabilityController {
    async handle(req, res) {
        const ownerId = req.user_id;
        const { id } = req.params;
        const service = new ToggleAvailabilityService_1.ToggleAvailabilityService();
        try {
            const result = await service.execute(id, ownerId);
            return res.json({ success: true, message: "Status atualizado", car: result });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
}
exports.ToggleAvailabilityController = ToggleAvailabilityController;
