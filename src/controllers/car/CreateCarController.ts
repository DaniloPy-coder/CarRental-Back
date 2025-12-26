import { Request, Response } from "express";
import { CreateCarService } from "../../services/car/CreateCarService";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { v4 as uuid } from "uuid";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface RequestWithFile extends Request {
    file: Express.Multer.File;
    user_id: string;
}

class CreateCarController {
    async handle(req: RequestWithFile, res: Response) {
        try {
            console.log("REQ.BODY:", req.body);
            console.log("REQ.FILE:", req.file);

            const ownerId = req.user_id;

            const {
                brand,
                model,
                year,
                category,
                transmission,
                pricePerDay,
                price_per_day,
                location,
                description,
                seatingCapacity,
                seating_capacity,
                fuelType,
                fuel_type,
            } = req.body;

            if (!req.file) {
                return res.status(400).json({ error: "Arquivo de imagem não encontrado" });
            }

            const file = req.file;
            const uniqueName = `${uuid()}-${file.originalname}`;

            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        folder: "cars",
                        public_id: uniqueName,
                    },
                    (error, result) => {
                        if (error || !result) return reject(error);
                        resolve(result);
                    }
                );
                uploadStream.end(file.buffer);
            });

            const seats = Number(seating_capacity || seatingCapacity);
            const fuel = fuel_type || fuelType;
            const price = Number(pricePerDay || price_per_day);

            const createCarService = new CreateCarService();
            const car = await createCarService.execute({
                ownerId,
                brand,
                model,
                image: resultFile.secure_url,
                year: Number(year),
                category,
                seatingCapacity: seats,
                fuelType: fuel,
                transmission,
                pricePerDay: price,
                location,
                description,
            });

            return res.status(201).json(car);

        } catch (error: any) {
            console.error("Erro ao criar carro:", error);
            return res.status(500).json({ error: error.message || "Erro ao criar o carro" });
        }
    }
}

export { CreateCarController };
