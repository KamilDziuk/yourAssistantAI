import express from "express";
import { limiter } from "../src/limiter.js";
import { schemasServer } from "../src/schemas/schema.js";
import requireToken from "../middleware/requireToken.js";
import {
  getChatStyle,
  updateChatStyle,
} from "../src/config/conversationData.js";

const { chatStyleSchema } = schemasServer();

export const chatStyleRouter = express.Router();

chatStyleRouter.get("/", async (req, res, next) => {
  try {
    res.json(await getChatStyle());
  } catch (err) {
    next(err);
  }
});

export const chatStyleSettingsRouter = express.Router({ mergeParams: true });

chatStyleSettingsRouter.post(
  "/",
  limiter,
  requireToken,
  async (req, res, next) => {
    try {
      const parsed = chatStyleSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid request body",
          details: parsed.error.flatten(),
        });
      }

      await updateChatStyle(parsed.data);

      return res.json({
        status: "ok",
      });
    } catch (err) {
      next(err);
    }
  },
);
