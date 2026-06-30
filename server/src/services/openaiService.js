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
}
