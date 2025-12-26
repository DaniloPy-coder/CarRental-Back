import { Express } from "express-serve-static-core";

declare global {
    namespace Express {
        interface Request {
            file?: Express.Multer.File;
            user_id?: string;
        }
    }
}
