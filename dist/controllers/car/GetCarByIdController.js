"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCarByIdController = void 0;
const GetCarByIdService_1 = require("../../services/car/GetCarByIdService");
class GetCarByIdController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const service = new GetCarByIdService_1.GetCarByIdService();
            const car = await service.execute(id);
            return res.json({
                success: true,
                car
            });
        }
        catch (err) {
            return res.status(404).json({
                success: false,
                message: err.message || "Erro ao buscar carro",
            });
        }
    }
}
exports.GetCarByIdController = GetCarByIdController;
