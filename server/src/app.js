import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

import helmet from "helmet";
import { limiter } from "./limiter.js";
import { schemasServer } from "./schemas/schema.js";
import {
  gethistory,
  addingConversationHistory,
  getAgentConfigurationData,
  updateAgentConfigurationData,
} from "./config/conversationData.js";
import path, { parse } from "path";
import { fileURLToPath } from "url";
import { openaiService } from "./services/openaiService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const conversationHistory = await gethistory();

let stringData = "";

async function updateContent() {
  stringData = await getAgentConfigurationData();
}

await updateContent();

setInterval(updateContent, 10000);

const app = express();

app.use(
  cors({
    origin: [
      "https://yourassistantai.uk",
      "https://www.yourassistantai.uk",
    ],
    methods: ["POST"],
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

const { askSchema, contactSchema } = schemasServer();

app.post("/contact", limiter, async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    await updateAgentConfigurationData(parsed.data.clientGuidelines);
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Problem to rsponse contact path:", error);
    console.error("Message:", error.message);
  }
});

app.post("/ask", limiter, async (req, res) => {
  await openaiService(
    askSchema,
    req,
    res,
    conversationHistory,
    addingConversationHistory,
    stringData,
  );
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`),
);
