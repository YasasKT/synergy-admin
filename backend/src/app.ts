import express, { NextFunction, Request, Response } from "express";
import ProjectRoutes from "./routes/projectRoute";
import ClientRoutes from "./routes/clientRoute";
import UserRoutes from "./routes/userRoute";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import path from "path";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CON_STRING,
    }),
  })
);

app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true, // Allow credentials (cookies) to be sent
}));

app.use(express.static("public"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", UserRoutes);

app.use("/api/projects", ProjectRoutes);

app.use("/api/clients", ClientRoutes);

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
