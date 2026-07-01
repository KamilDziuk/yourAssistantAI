import express from "express";
import { limiter } from "../src/limiter.js";
import { schemasServer } from "../src/schemas/schema.js";
import { openaiService } from "../src/services/openaiService.js";
import {
  gethistory,
  addingConversationHistory,
} from "../src/config/conversationData.js";

const router = express.Router();
const { askSchema } = schemasServer();
const conversationHistory = await gethistory();

router.post("/", limiter, async (req, res) => {
  try {
    stringData = await getAgentConfigurationData();

    await openaiService(
      askSchema,
      req,
      res,
      conversationHistory,
      addingConversationHistory,
      stringData,
    );
  } catch (error) {
    console.error("ASK ERROR:", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
