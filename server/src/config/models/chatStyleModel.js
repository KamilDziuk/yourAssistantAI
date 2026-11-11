import mongoose from "mongoose";

export const chatStyleSchema = new mongoose.Schema({
  key: String,
  backgroundChat: String,
  backgroundInsideChat: String,
  chatTextColor: String,
  chatWelcomeText: String,
});
