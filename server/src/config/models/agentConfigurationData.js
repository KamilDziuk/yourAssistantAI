import mongoose from "mongoose";

export const agentConfigurationDataSchema = new mongoose.Schema({
  key: String,
  customerData: String,
});
