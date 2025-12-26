"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOwnerCarsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListOwnerCarsService {
    async execute(ownerId) {
        return prisma_1.default.car.findMany({
            where: { ownerId },
            orderBy: { createdAt: "desc" }
        });
    }
}
exports.ListOwnerCarsService = ListOwnerCarsService;
