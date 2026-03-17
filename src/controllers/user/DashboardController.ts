import { Request, Response } from "express";
import { DashboardService } from "../../services/user/DashboardService";
class DashboardController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const dashboardService = new DashboardService();

    const data = await dashboardService.execute(userId);

    return res.json(data);
  }
}

export { DashboardController };
