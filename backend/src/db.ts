import { Pool } from "pg";

import { logger } from "./logs";

const pool = new Pool({
  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,
});

pool.on("connect", () => {
  logger.info("PostgreSQL Connected");
});

pool.on("error", (error) => {
  logger.error("PostgreSQL Error");
  logger.error(error);
});

export default pool;
