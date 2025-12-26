"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarController = void 0;
const CreateCarService_1 = require("../../services/car/CreateCarService");
const cloudinary_1 = require("cloudinary");
const uuid_1 = require("uuid");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class CreateCarController {
    async handle(req, res) {
        try {
            console.log("REQ.BODY:", req.body);
            console.log("REQ.FILE:", req.file);
            const ownerId = req.user_id;
            const { brand, model, year, category, transmission, pricePerDay, price_per_day, location, description, seatingCapacity, seating_capacity, fuelType, fuel_type, } = req.body;
            if (!req.file) {
                return res.status(400).json({ error: "Arquivo de imagem não encontrado" });
            }
            const file = req.file;
            const uniqueName = `${(0, uuid_1.v4)()}-${file.originalname}`;
            const resultFile = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    resource_type: "auto",
                    folder: "cars",
                    public_id: uniqueName,
                }, (error, result) => {
                    if (error || !result)
                        return reject(error);
                    resolve(result);
                });
                uploadStream.end(file.buffer);
            });
            const seats = Number(seating_capacity || seatingCapacity);
            const fuel = fuel_type || fuelType;
            const price = Number(pricePerDay || price_per_day);
            const createCarService = new CreateCarService_1.CreateCarService();
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
        }
        catch (error) {
            console.error("Erro ao criar carro:", error);
            return res.status(500).json({ error: error.message || "Erro ao criar o carro" });
        }
    }
}
exports.CreateCarController = CreateCarController;
