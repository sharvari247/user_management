import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import pool from "./db";

import { logger, requestIdMiddleware, errorLogger, morganMiddleware, } from "./logs";
import userRoutes from "../src/modules/users/users.routes";
import roleRoutes from "./modules/roles/roles.routes";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware);
app.use(morganMiddleware);

app.get("/", (req: Request, res: Response) => res.send("Hello world!"));
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

app.use(errorLogger);

async function startServer() {
  try {
    await pool.query("SELECT NOW()");
    logger.info("Database connected successfully");
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Database connection failed");
    logger.error(error);
    process.exit(1);
  }
}

startServer();

