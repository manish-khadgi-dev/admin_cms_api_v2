import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";

const PORT = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//db connect
import { connectDb } from "./src/config/dbConfig.js";
connectDb();

//routers
import adminRouter from "./src/routers/adminRouter.js";
app.use("/api/v1/admin", adminRouter);

app.use("/", (req, res) => {
  res.json({
    message: " You do not have access here",
  });
});

//uncaught routers
app.use("*", (req, res, next) => {
  const error = {
    errorCode: 404,
    message: "Requested resources not found",
  };
  next(error);
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running at http://localhost:${PORT}`);
});
