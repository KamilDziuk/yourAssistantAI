import fetch from "node-fetch";
import { schemasServer } from "../schemas/schema";

export async function askOpenAI(messages) {
  const { askSchema } = schemasServer();

  const parsed = askSchema.safeParse(messages);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: parsed.data,
      temperature: 0.9,
      max_tokens: 300,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "OpenAI request failed.");
  }

  return data.choices?.[0]?.message?.content ?? "";
}
