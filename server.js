import express from "express";
const app = express();

const PORT = process.env.PORT || 8000;

import cors from "cors";
import morgan from "morgan";
//uncaught routers
app.use("*", (req, res, next) => {
  const error = {
    errorCode: 404,
    message: "Requested resources not found",
  };
  next(error);
});

//middlwares

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running at http://localhost:${PORT}`);
});
