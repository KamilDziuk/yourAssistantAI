import mongoDB from "./configDB.js";
import ConversationHistory from "./models/conversationHistoryModel.js";
import AgentConfigurationData from "./models/agentConfigurationData.js";
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

    logger.info("Correctly sending the conversation history");
  } catch (err) {
    logger.error({ err }, "Problem to conversation history");
    throw err;
  }
}
async function deletingDataFromDatabase() {
  await ConversationHistory.deleteMany({});
}

export async function gethistory() {
  try {
    await mongoDB();
    const getData = await ConversationHistory.find().select("question -_id");
    setTimeout(deletingDataFromDatabase, 100000);

    const getfullData = getData.map((t) => t.question);
    const stringData = String(getfullData);

    logger.info("Correctly download the conversation history");
    return stringData;
  } catch (err) {
    logger.error({ err }, "Failed download the conversation history");
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
    logger.info("Correctly instance change for agent");
  } catch (err) {
    logger.error({ err }, "Failed download the conversation history");
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
    logger.info(
      "Correctly writing data from the database using the customerData variable",
    );
    return stringData;
  } catch (err) {
    logger.error(
      { err },
      "Incorrectly writing data from the database after the customerData variable",
    );
    throw err;
  }
}
