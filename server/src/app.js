import express from "express";
import { limiter } from "./limiter.js";
import { schemasServer } from "./schemas/schema.js";
import helmet from "helmet";
import { Resource } from "sst";
import {
  gethistory,
  addingConversationHistory,
  getAgentConfigurationData,
  updateAgentConfigurationData,
} from "./config/conversationData.js";

import { openaiService } from "./services/openaiService.js";

const conversationHistory = await gethistory();

let stringData = await getAgentConfigurationData();

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);

const { askSchema, contactSchema } = schemasServer();

app.post("/:token/contact", limiter, async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    const { token } = req.params;

    if (token !== process.env.SECRET_TOKEN) {
      return res.status(401).json({
        error: `Invalid request token`,
      });
    }

    if (!parsed.success) {
      return res.status(400).json({
        error: `Invalid request body`,
      });
    }

    await updateAgentConfigurationData(parsed.data.clientGuidelines);

    return res.send({
      status: "ok",
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/ask", limiter, async (req, res) => {
  try {
    stringData = await getAgentConfigurationData();

    await openaiService(
      askSchema,
      req,
      res,
      conversationHistory,
      addingConversationHistory,
      stringData,
    );
  } catch (error) {
    console.error("ASK ERROR:", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.use((err, req, res, _next) => {
  console.error("GLOBAL ERROR:", err);

  return res.status(500).json({
    error: err instanceof Error ? err.message : "Internal Server Error",
  });
});

export default app;
