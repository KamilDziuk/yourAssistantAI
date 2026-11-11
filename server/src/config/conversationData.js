import mongoDB from "./configDB.js";
import { getModels } from "./models/index.js";
import { HISTORY_TTL_SECONDS } from "./models/conversationHistoryModel.js";
import logger from "./logger.js";

export async function addingConversationHistory(
  db,
  questionFromCustomer,
  answerFromOpenAI,
) {
  try {
    await mongoDB();
    const { ConversationHistory } = getModels(db);

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

export async function gethistory(db) {
  try {
    await mongoDB();
    const { ConversationHistory } = getModels(db);
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

export async function updateAgentConfigurationData(db, customerText) {
  try {
    await mongoDB();
    const { AgentConfigurationData } = getModels(db);

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

export async function getAgentConfigurationData(db) {
  try {
    await mongoDB();
    const { AgentConfigurationData } = getModels(db);

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

export async function updateChatStyle(db, chatStyle) {
  try {
    await mongoDB();
    const { ChatStyle } = getModels(db);

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

export async function getChatStyle(db) {
  try {
    await mongoDB();
    const { ChatStyle } = getModels(db);

    const chatStyle = await ChatStyle.findOne({ key: "chatStyle" })
      .select(
        "backgroundChat backgroundInsideChat chatTextColor chatWelcomeText chatTitle -_id",
      )
      .lean();

    return chatStyle ?? {};
  } catch (err) {
    logger.error({ err }, "Failed to load chat style");
    throw err;
  }
}
