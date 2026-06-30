export async function openaiService({
  askSchema,
  body,
  conversationHistory,
  addingConversationHistory,
  stringData,
}) {
  try {
    const parsed = askSchema.safeParse(body);

    if (!parsed.success) {
      throw new Error("Invalid request body");
    }

    const { messages } = parsed.data;

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
        messages: [
          {
            role: "system",
            content: `
Use conversation history to stay consistent:
${JSON.stringify(conversationHistory)}
              `,
          },
          {
            role: "system",
            content: stringData,
          },
          {
            role: "user",
            content: messages,
          },
        ],
      }),
    });

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content || "";

    await addingConversationHistory(messages, text);

    return text;
  } catch (error) {
    console.error("OpenAI service error:", error);
    throw error;
  }
}
