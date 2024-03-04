import chalk from "chalk";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { systemLogs, morganMiddleware } from "./utils/logger.js";
import connectionToDB from "./config/connectDB.js";
import mongoSanitize from "express-mongo-sanitize";
import { notFoundHandler, errorHandler } from "./Middleware/errorMiddleware.js";

await connectionToDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(mongoSanitize());

app.use(morganMiddleware);

app.get("/api/v1/test", (req, res) => {
  res.json({ Hi: "Welcome to the invoice app" });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 1997;

app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold("✔")} 👍 Server running in ${chalk.yellow.bold(
      process.env.NODE_ENV
    )} mode on port ${chalk.blue.bold(PORT)}`
  );

  systemLogs.info(
    `System is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
