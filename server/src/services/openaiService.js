import fetch from "node-fetch";

export async function askOpenAI(messages) {
  const { askSchema } = schemasServer();
  const parsed = askSchema.safeParse(req.body);
  messages = parsed.data;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 100,
      temperature: 0.9,
      messages,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "";
}
