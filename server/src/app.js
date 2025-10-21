import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import {
  gethistory,
  addingConversationHistory,
} from "./config/addingConversationHistory.js";
const conversationHistory = await gethistory();

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/ask", async (req, res) => {
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: `You are a personal assistant.
Rules:
- ONLY answer questions using these data sources: ${req.body.gitAbout}, ${req.body.gitRepo}.
- Use ${conversationHistory} to remember what the user asked previously, and answer consistently.
- Do not invent or guess any information.
- If the user asks about projects, respond strictly based on ${req.body.gitAbout}.
- If the user asks about GitHub repositories or projects, show ${req.body.gitRepo}.
- If the user asks about previous conversations, you can summarize them using ${conversationHistory}.`,
          },
          { role: "user", content: req.body.messages },
        ],
      }),
    });

    const d = await r.json();
    const text = d.choices?.[0]?.message?.content || "";
    addingConversationHistory(req.body.messages, text);
    res.json(text);
  } catch (error) {
    console.error("Problem to rsponse api openai:", error);
    console.error("Message:", error.message);
  }
});
app.listen(process.env.PORT || 3000, () =>
  console.log(
    `Server running on http://localhost:${process.env.PORT || 3000}`
  )
);
