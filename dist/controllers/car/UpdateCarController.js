"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarController = void 0;
const UpdateCarService_1 = require("../../services/car/UpdateCarService");
const cloudinary_1 = require("cloudinary");
const uuid_1 = require("uuid");
class UpdateCarController {
    async handle(req, res) {
        const ownerId = req.user_id;
        const { id } = req.params;
        const { brand, model, year, category, seatingCapacity, seating_capacity, fuelType, fuel_type, transmission, pricePerDay, price_per_day, location, description, } = req.body;
        let imageUrl;
        const file = req.file;
        if (file) {
            const uniqueName = `${(0, uuid_1.v4)()}-${file.originalname}`;
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto", folder: "cars", public_id: uniqueName }, (err, result) => (err || !result ? reject(err) : resolve(result)));
                stream.end(file.buffer);
            });
            imageUrl = result.secure_url;
        }
        const updateCarService = new UpdateCarService_1.UpdateCarService();
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
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.UpdateCarController = UpdateCarController;
