import { Request, Response } from "express";
import { UpdateCarService } from "../../services/car/UpdateCarService";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";

interface RequestWithFile extends Request {
    file?: Express.Multer.File;
    user_id: string;
}

class UpdateCarController {
    async handle(req: RequestWithFile, res: Response) {
        const ownerId = req.user_id;
        const { id } = req.params;

        const {
            brand,
            model,
            year,
            category,
            seatingCapacity,
            seating_capacity,
            fuelType,
            fuel_type,
            transmission,
            pricePerDay,
            price_per_day,
            location,
            description,
        } = req.body;

        let imageUrl: string | undefined;

        const file = req.file;
        if (file) {
            const uniqueName = `${uuid()}-${file.originalname}`;
            const result = await new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: "auto", folder: "cars", public_id: uniqueName },
                    (err, result) => (err || !result ? reject(err) : resolve(result))
                );
                stream.end(file.buffer);
            });

            imageUrl = result.secure_url;
        }

        const updateCarService = new UpdateCarService();

        try {
            const updatedCar = await updateCarService.execute({
                id,
                ownerId,
                brand,
                model,
                year: year ? Number(year) : undefined,
                category,
                seatingCapacity: Number(seatingCapacity || seating_capacity),
                fuelType: fuelType || fuel_type,
                transmission,
                pricePerDay: Number(pricePerDay || price_per_day),
                location,
                description,
                image: imageUrl,
            });

            return res.json(updatedCar);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateCarController };
