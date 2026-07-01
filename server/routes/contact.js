import express from "express";
import { limiter } from "../src/limiter.js";
import { schemasServer } from "../src/schemas/schema.js";
import { openaiService } from "../src/services/openaiService.js";
import {
  getAgentConfigurationData,
  updateAgentConfigurationData,
} from "../src/config/conversationData.js";

const router = express.Router();

const { contactSchema } = schemasServer();
let stringData = await getAgentConfigurationData();

router.post("/", limiter, async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    const { token } = req.params;

    if (token !== process.env.SECRET_TOKEN) {
      return res.status(401).json({
        error: `Invalid request token`,
      });
    }

    if (!parsed.success) {
      return res.status(400).json({
        error: `Invalid request body`,
      });
    }

    await updateAgentConfigurationData(parsed.data.clientGuidelines);

    return res.send({
      status: "ok",
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
