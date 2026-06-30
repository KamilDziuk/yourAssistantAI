import express from "express";
import helmet from "helmet";

import contactRoute from "./routes/contact.js";
import askRoute from "./routes/ask.js";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/", contactRoute);
app.use("/", askRoute);

// global error handler
app.use((err, req, res, _next) => {
  console.error("GLOBAL ERROR:", err);

  return res.status(500).json({
    error: err instanceof Error ? err.message : "Internal Server Error",
  });
});

export default app;
