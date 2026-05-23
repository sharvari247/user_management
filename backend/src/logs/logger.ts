import winston from "winston";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

// WINSTON LOGGER

const logFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${
      stack || message
    }`;
  }
);

export const logger = winston.createLogger({
  level: "debug",

  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss"
        }),
        logFormat
      )
    }),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),

    new winston.transports.File({
      filename: "logs/combined.log"
    })
  ]
});


// REQUEST ID MIDDLEWARE

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.headers["x-request-id"] = uuidv4();

  next();
};

// MORGAN HTTP LOGGER

const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  }
};

export const morganMiddleware = morgan(
  (tokens, req, res) => {
    return [
      `[${req.headers["x-request-id"]}]`,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      `${tokens["response-time"](req, res)} ms`
    ].join(" ");
  },
  { stream }
);


//ERROR LOGGER

export const errorLogger = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    requestId: req.headers["x-request-id"],
    method: req.method,
    url: req.originalUrl,
    message: error.message,
    stack: error.stack
  });

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal Server Error"
  });
};

export default logger;