import { openaiService } from "../services/openaiService.js";

router.post("/ask", limiter, async (req, res) => {
  try {
    const conversationHistory = await gethistory();
    const stringData = await getAgentConfigurationData();

    const result = await openaiService({
      askSchema,
      body: req.body,
      conversationHistory,
      addingConversationHistory,
      stringData,
    });

    res.json(result);
  } catch (error) {
    console.error("ASK ERROR:", error);

    res.status(500).json({
      error: error.message || "Unknown error",
    });
  }
});