import logger from "../src/config/logger";

export async function openaiService(
  askSchema,
  req,
  res,
  conversationHistory,
  addingConversationHistory,
  stringData,
) {
  try {
    const parsed = askSchema.safeParse(req.body);

    if (!parsed.success) {
      logger.warn({ body: req.body }, "Invalid request payload");
      throw new Error("Invalid request");
    }

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

    if (requireOpenAI.status === 429) {
      logger.warn("Rate limit hit (or quota exceeded)");
    }

    const dataContent = await requireOpenAI.json();
    const text = dataContent.choices?.[0]?.message?.content || "";
    addingConversationHistory(req.body.messages, text);

    res.json(text);

    logger.info(
      {
        model: "gpt-4o-mini",
        max_tokens: 100,
      },
      "OpenAI request completed",
    );
  } catch (err) {
    logger.error({ err }, "OpenAI service error");
    throw err;
  }
}
