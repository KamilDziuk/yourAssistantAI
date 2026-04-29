import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import helmet from "helmet";
import { limiter } from "./limiter.js";
import { z } from "zod";
import {
  gethistory,
  addingConversationHistory,
  getAgentConfigurationData,
  updateAgentConfigurationData,
} from "./config/conversationData.js";
import path, { parse } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conversationHistory = await gethistory();

let stringData = "";

async function updateContent() {
  stringData = await getAgentConfigurationData();
}

await updateContent();

setInterval(updateContent, 10000);

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://your-assistant-ai.onrender.com",
    methods: ["POST"],
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

const askSchema = z.object({
  messages: z.string().min(1).max(1000),
});

const contactSchema = z.object({
  clientGuidelines: z.string().min(1).max(5000),
});

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
  try {
    const parsed = askSchema.safeParse(req.body);
    const { messages } = parsed.data;
    const requireOpenAI = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 100,
          temperature: 0.9,
          messages: [
            {
              role: "system",
              content: `
- Use ${conversationHistory} to remember what the user asked previously, and answer consistently.`,
            },
            {
              role: "system",
              content: `
            ${stringData}`,
            },
            { role: "user", content: messages },
          ],
        }),
      },
    );

    const dataContent = await requireOpenAI.json();
    const text = dataContent.choices?.[0]?.message?.content || "";
    addingConversationHistory(req.body.messages, text);
    res.json(text);
  } catch (error) {
    console.error("Problem to rsponse api openai:", error);
    console.error("Message:", error.message);
  }
});
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`),
);
