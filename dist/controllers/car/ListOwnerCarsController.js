"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOwnerCarsController = void 0;
const ListOwnerCarsService_1 = require("../../services/car/ListOwnerCarsService");
class ListOwnerCarsController {
    async handle(req, res) {
        try {
            const ownerId = req.user_id;
            const service = new ListOwnerCarsService_1.ListOwnerCarsService();
            const cars = await service.execute(ownerId);
            return res.json({
                success: true,
                cars
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || "Erro ao listar carros do proprietário",
            });
        }
    }
}
exports.ListOwnerCarsController = ListOwnerCarsController;
