"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCarsController = void 0;
const ListCarsService_1 = require("../../services/car/ListCarsService");
class ListCarsController {
    async handle(req, res) {
        try {
            const listCarsService = new ListCarsService_1.ListCarsService();
            const cars = await listCarsService.execute();
            return res.json({
                success: true,
                cars,
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message || "Erro ao listar carros",
            });
        }
    }
}
exports.ListCarsController = ListCarsController;
