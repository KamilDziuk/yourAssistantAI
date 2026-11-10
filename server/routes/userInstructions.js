import express from "express";
import { limiter } from "../src/limiter.js";
import { schemasServer } from "../src/schemas/schema.js";
import requireToken from "../middleware/requireToken.js";
import { updateAgentConfigurationData } from "../src/config/conversationData.js";

const router = express.Router({ mergeParams: true });

const { contactSchema } = schemasServer();

router.post("/", limiter, requireToken, async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid request body",
        details: parsed.error.flatten(),
      });
    }

    await updateAgentConfigurationData(parsed.data.clientGuidelines);

    return res.json({
      status: "ok",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
