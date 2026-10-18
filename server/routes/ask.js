import express from "express";
import { limiter } from "../src/limiter.js";
import { schemasServer } from "../src/schemas/schema.js";
import { openaiService } from "../services/openaiService.js";
import {
  gethistory,
  addingConversationHistory,
  getAgentConfigurationData,
} from "../src/config/conversationData.js";

const router = express.Router();
const { askSchema } = schemasServer();

router.post("/", limiter, async (req, res, next) => {
  try {
    const [conversationHistory, stringData] = await Promise.all([
      gethistory(),
      getAgentConfigurationData(),
    ]);

    await openaiService(
      askSchema,
      req,
      res,
      conversationHistory,
      addingConversationHistory,
      stringData,
    );
  } catch (err) {

    next(err);
  }
});

export default router;
