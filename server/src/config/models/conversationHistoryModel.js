import mongoose from "mongoose";

export const HISTORY_TTL_SECONDS = 100;

export const conversationHistorySchema = new mongoose.Schema({
  question: String,
  answer: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: HISTORY_TTL_SECONDS,
  },
});
