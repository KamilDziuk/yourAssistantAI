import mongoose from "mongoose";

const AgentConfigurationData = mongoose.model("AgentConfigurationData", {
  key: String,
  customerData: String,
});

export default AgentConfigurationData;