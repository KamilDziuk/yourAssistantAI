import { conversationHistorySchema } from "./conversationHistoryModel.js";
import { agentConfigurationDataSchema } from "./agentConfigurationData.js";
import { chatStyleSchema } from "./chatStyleModel.js";

const schemas = {
  ConversationHistory: conversationHistorySchema,
  AgentConfigurationData: agentConfigurationDataSchema,
  ChatStyle: chatStyleSchema,
};

// Returns models bound to the given client database. Mongoose caches
// compiled models per connection, so this is cheap to call per request.
export function getModels(db) {
  return Object.fromEntries(
    Object.entries(schemas).map(([name, schema]) => [
      name,
      db.models[name] ?? db.model(name, schema),
    ]),
  );
}
