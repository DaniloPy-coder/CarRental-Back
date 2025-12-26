"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPublicCarsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListPublicCarsService {
    async execute(location) {
        const query = { isAvailable: true };
        if (location) {
            query.location = location;
        }
        const cars = await prisma_1.default.car.findMany({
            where: query,
            orderBy: { createdAt: "desc" },
        });
        return cars;
    }
}
exports.ListPublicCarsService = ListPublicCarsService;
