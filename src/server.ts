import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import multer from "multer";
import uploadConfig from "./config/multer";
import path from "path";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://car-rental-taupe-two.vercel.app",
        ],
        credentials: true,
    })
);

const __dirnameFix = path.resolve();

app.use(
    express.static(
        path.join(__dirnameFix, "..", "frontend", "dist")
    )
);

app.use("/", router);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(
        path.join(__dirnameFix, "..", "frontend", "dist", "index.html")
    );
});

// 🔹 ERROR HANDLER
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(400).json({ error: err.message });
});

export default app;
