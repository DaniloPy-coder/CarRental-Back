"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://car-rental-taupe-two.vercel.app"
    ],
    credentials: true,
}));
const upload = (0, multer_1.default)(multer_2.default.upload());
app.use("/", routes_1.default);
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        res.status(400).json({
            error: err.message,
        });
    }
    else {
        res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
});
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
