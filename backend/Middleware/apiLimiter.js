import rateLimiter from "express-rate-limit";
import { systemLogs } from "../utils/logger.js";

export const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests, please try again later.",
  },
  handler: (req, res, next, options) => {
    systemLogs.error(
      `Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    );

    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimiter({
  windowMs: 30 * 60 * 1000,
  max: 20,
  message: {
    message: "Too many login attempts, please try again later.",
  },
  handler: (req, res, next, options) => {
    systemLogs.error(
      `Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    );

    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
