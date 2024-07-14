import express, { NextFunction, Request, Response } from "express";
import ProjectRoute from "./routes/projectRoute";
import ClientRoute from "./routes/clientRoute";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import path from "path";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.use(express.static("public"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/projects", ProjectRoute);

app.use("/api/clients", ClientRoute);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
