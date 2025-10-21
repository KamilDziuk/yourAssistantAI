import mongoose from "mongoose";

const ConversationHistory = mongoose.model("ConversationHistory", {
  question: String,
  answer: String,
});

export default ConversationHistory;
