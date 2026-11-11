import express from "express";
import { limiter } from "../src/limiter.js";
import { schemasServer } from "../src/schemas/schema.js";
import { openaiService } from "../services/openaiService.js";
import {
  gethistory,
  addingConversationHistory,
  getAgentConfigurationData,
} from "../src/config/conversationData.js";

const router = express.Router({ mergeParams: true });
const { askSchema } = schemasServer();

router.post("/", limiter, async (req, res, next) => {
  try {
    const [conversationHistory, stringData] = await Promise.all([
      gethistory(req.db),
      getAgentConfigurationData(req.db),
    ]);

    await openaiService(
      askSchema,
      req,
      res,
      conversationHistory,
      (question, answer) =>
        addingConversationHistory(req.db, question, answer),
      stringData,
    );
  } catch (err) {
    next(err);
  }
});

export default router;
