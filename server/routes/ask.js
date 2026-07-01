import express from "express";
import { limiter } from "../src/limiter.js";
import { schemasServer } from "../src/schemas/schema.js";
import { openaiService } from "../services/openaiService";
import {
  gethistory,
  addingConversationHistory,
  getAgentConfigurationData,
} from "../src/config/conversationData.js";

const router = express.Router();
const { askSchema } = schemasServer();
const conversationHistory = await gethistory();
let stringData = await getAgentConfigurationData();

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
  } catch (err) {

    next(err);
  }
});

export default router;
