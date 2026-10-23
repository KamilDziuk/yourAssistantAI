import mongoose from "mongoose";

export const HISTORY_TTL_SECONDS = 100;

const ConversationHistory = mongoose.model("ConversationHistory", {
  question: String,
  answer: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: HISTORY_TTL_SECONDS,
  },
});

export default ConversationHistory;
