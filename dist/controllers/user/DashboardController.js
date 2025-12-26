"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const DashboardService_1 = require("../../services/user/DashboardService");
class DashboardController {
    async handle(req, res) {
        const userId = req.user_id;
        console.log("Dashboard userId:", userId);
        try {
            const service = new DashboardService_1.DashboardService();
            const dashboardData = await service.execute(userId);
            console.log("Dashboard data:", dashboardData);
            return res.json({
                success: true,
                dashboardData
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}
exports.DashboardController = DashboardController;
