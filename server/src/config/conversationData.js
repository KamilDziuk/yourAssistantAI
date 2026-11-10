import mongoDB from "./configDB.js";
import ConversationHistory, {
  HISTORY_TTL_SECONDS,
} from "./models/conversationHistoryModel.js";
import AgentConfigurationData from "./models/agentConfigurationData.js";
import ChatStyle from "./models/chatStyleModel.js";
import logger from "./logger.js";

export async function addingConversationHistory(
  questionFromCustomer,
  answerFromOpenAI,
) {
  try {
    await mongoDB();

    await new ConversationHistory({
      question: questionFromCustomer,
      answer: answerFromOpenAI,
    }).save();

    logger.info("Conversation history saved");
  } catch (err) {
    logger.error({ err }, "Failed to save conversation history");
    throw err;
  }
}

export async function gethistory() {
  try {
    await mongoDB();
    const since = new Date(Date.now() - HISTORY_TTL_SECONDS * 1000);
    const getData = await ConversationHistory.find({
      createdAt: { $gte: since },
    }).select("question -_id");

    const getfullData = getData.map((t) => t.question);
    const stringData = String(getfullData);

    logger.info("Conversation history loaded");
    return stringData;
  } catch (err) {
    logger.error({ err }, "Failed to load conversation history");
    throw err;
  }
}

export async function updateAgentConfigurationData(customerText) {
  try {
    await mongoDB();

    await AgentConfigurationData.findOneAndUpdate(
      { key: "agentConfig" },
      { $set: { customerData: customerText } },
      { upsert: true, new: true },
    );
    logger.info("Agent configuration updated");
  } catch (err) {
    logger.error({ err }, "Failed to update agent configuration");
    throw err;
  }
}
export async function getAgentConfigurationData() {
  try {
    await mongoDB();

    const getData =
      await AgentConfigurationData.find().select("customerData -_id");
    const getfullData = getData.map((t) => t.customerData);
    const stringData = String(getfullData);
    logger.info("Agent configuration loaded");
    return stringData;
  } catch (err) {
    logger.error({ err }, "Failed to load agent configuration");
    throw err;
  }
}

export async function updateChatStyle(chatStyle) {
  try {
    await mongoDB();

    await ChatStyle.findOneAndUpdate(
      { key: "chatStyle" },
      { $set: chatStyle },
      { upsert: true },
    );
    logger.info("Chat style updated");
  } catch (err) {
    logger.error({ err }, "Failed to update chat style");
    throw err;
  }
}

export async function getChatStyle() {
  try {
    await mongoDB();

    const chatStyle = await ChatStyle.findOne({ key: "chatStyle" })
      .select(
        "backgroundChat backgroundInsideChat chatTextColor chatWelcomeText -_id",
      )
      .lean();

    return chatStyle ?? {};
  } catch (err) {
    logger.error({ err }, "Failed to load chat style");
    throw err;
  }
}
