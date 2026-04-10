import { Request, Response } from "express";
import { DashboardService } from "../../services/user/DashboardService";
class DashboardController {
  async handle(req: Request, res: Response) {
    try {
      const userId = req.user_id;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Não autorizado" });
      }

      const dashboardService = new DashboardService();
      const data = await dashboardService.execute(userId);

      return res.json({
        success: true,
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Erro interno" });
    }
  }
}

export { DashboardController };
