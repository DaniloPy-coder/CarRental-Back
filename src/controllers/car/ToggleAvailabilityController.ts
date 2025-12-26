import { Request, Response } from "express";
import { ToggleAvailabilityService } from "../../services/car/ToggleAvailabilityService";

class ToggleAvailabilityController {
    async handle(req: Request, res: Response) {
        const ownerId = req.user_id;
        const { id } = req.params;

        const service = new ToggleAvailabilityService();

        try {
            const result = await service.execute(id, ownerId);
            return res.json({ success: true, message: "Status atualizado", car: result });
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
}

export { ToggleAvailabilityController };
