import express from "express";
import { limiter } from "../src/limiter.js";
import { askOpenAI } from "../src/services/openaiService.js";
import {
  gethistory,
  addingConversationHistory,
  getAgentConfigurationData,
} from "../src/config/conversationData.js";

const router = express.Router();

router.post("/", limiter, async (req, res) => {

  let config = "";

  async function updateContent() {
    config = await getAgentConfigurationData();
  }

  await updateContent();
  setInterval(updateContent, 1000);
  const history = await gethistory();

  try {
    const answer = await askOpenAI([
      {
        role: "system",
        content: `
- Use ${history} to remember what the user asked previously, and answer consistently.`,
      },
      {
        role: "system",
        content: `
            ${config}`,
      },
      { role: "user", content: req.body.messages },
    ]);

    await addingConversationHistory(req.body.messages, answer);
    res.json(answer);
  } catch (error) {
    console.error("Problem to rsponse api openai:", error);
    console.error("Message:", error.message);
  }
});
export default router;
