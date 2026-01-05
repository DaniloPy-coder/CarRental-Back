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
            "https://car-rental-taupe-two.vercel.app"
        ],
        credentials: true,
    })
);

const upload = multer(uploadConfig.upload());

app.use("/", router);

const __dirnameFix = path.resolve();

app.use(express.static(path.join(__dirnameFix, "dist")));

app.get("*", (req: Request, res: Response) => {
    res.sendFile(
        path.join(__dirnameFix, "dist", "index.html")
    );
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal server error.",
    });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
