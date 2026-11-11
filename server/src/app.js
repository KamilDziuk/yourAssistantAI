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
const jsonBody = express.json({ limit: "10kb" });
const chatStyleJsonBody = express.json({ limit: "200kb" });

// Saving the chat style can include a small logo image, so only that
// route accepts a larger body.
app.use((req, res, next) =>
  req.path.endsWith("/chatStyle")
    ? chatStyleJsonBody(req, res, next)
    : jsonBody(req, res, next),
);

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
