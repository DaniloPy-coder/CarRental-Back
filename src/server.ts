import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import multer from "multer";
import uploadConfig from "./config/multer";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://car-rental-one-navy.vercel.app",
        ],
        credentials: true,
    })
);

const upload = multer(uploadConfig.upload());

app.use("/", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal server error.",
    });
});

export default app;
