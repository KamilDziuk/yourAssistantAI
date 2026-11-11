import express from "express";
import helmet from "helmet";
import cors from "cors";
import askRoute from "../routes/ask.js";
import userInstructionsRoute from "../routes/userInstructions.js";
import {
  chatStyleRouter,
  chatStyleSettingsRouter,
} from "../routes/chatStyle.js";
import resolveClient from "../middleware/resolveClient.js";
import notFound from "../middleware/notFound.js";
import errorHandler from "../middleware/errorHandler.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true,
  }),
);
app.use(express.json({ limit: "10kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);

const clientRouter = express.Router({ mergeParams: true });

clientRouter.use("/ask", askRoute);
clientRouter.use("/:token/userInstructions", userInstructionsRoute);
clientRouter.use("/chatStyle", chatStyleRouter);
clientRouter.use("/:token/chatStyle", chatStyleSettingsRouter);

app.use("/c/:client", resolveClient, clientRouter);
app.use("/", resolveClient, clientRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
