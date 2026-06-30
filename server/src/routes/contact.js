import express from "express";
import { limiter } from "../limiter.js";
import { schemasServer } from "../schemas/schema.js";
import { updateAgentConfigurationData } from "../config/conversationData.js";

const router = express.Router();
const { contactSchema } = schemasServer();

router.post("/:token/contact", limiter, async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    const { token } = req.params;

    if (token !== process.env.SECRET_TOKEN) {
      return res.status(401).json({ error: "Invalid request token" });
    }

    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    await updateAgentConfigurationData(parsed.data.clientGuidelines);

    return res.send({ status: "ok" });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
