import express from "express";
import helmet from "helmet";
import askRoute from "../routes/ask.js";
import userInstructionsRoute from "../routes/userInstructions.js";
import notFound from "../middleware/notFound.js";
import errorHandler from "../middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);

app.use("/ask", askRoute);
app.use("/:token/userInstructions", userInstructionsRoute);

app.use(notFound);
app.use(errorHandler);

export default app;
