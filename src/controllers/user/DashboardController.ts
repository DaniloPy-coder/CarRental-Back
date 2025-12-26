import { Request, Response } from "express";
import { DashboardService } from "../../services/user/DashboardService";

class DashboardController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;
        console.log("Dashboard userId:", userId);

        try {
            const service = new DashboardService();
            const dashboardData = await service.execute(userId);

            console.log("Dashboard data:", dashboardData);

            return res.json({
                success: true,
                dashboardData
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}

export { DashboardController };
