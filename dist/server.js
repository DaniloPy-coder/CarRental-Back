"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://car-rental-taupe-two.vercel.app",
    ],
    credentials: true,
}));
const __dirnameFix = path_1.default.resolve();
app.use(express_1.default.static(path_1.default.join(__dirnameFix, "..", "frontend", "dist")));
app.use("/", routes_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirnameFix, "..", "frontend", "dist", "index.html"));
});
// 🔹 ERROR HANDLER
app.use((err, req, res, next) => {
    return res.status(400).json({ error: err.message });
});
exports.default = app;
