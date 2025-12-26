import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import multer from "multer";
import uploadConfig from "./config/multer";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const upload = multer(uploadConfig.upload());

app.use("/", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(400).json({
            error: err.message,
        });
    } else {
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

export default app;
