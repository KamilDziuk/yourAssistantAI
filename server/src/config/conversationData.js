import mongoDB from "./configDB.js";
import ConversationHistory from "./models/conversationHistoryModel.js";
import AgentConfigurationData from "./models/agentConfigurationData.js";

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
  } catch (error) {
    console.error("Problem to conversation history", error);
    console.error("Message:", error.message);
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

    return stringData;
  } catch (error) {
    console.error("Problem to get history", error);
    console.error("Message:", error.message);
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
  } catch (error) {
    console.error("Problem to update agent configuration data", error);
    console.error("Message:", error.message);
  }
}
export async function getAgentConfigurationData() {
  try {
    await mongoDB();

    const getData =
      await AgentConfigurationData.find().select("customerData -_id");
    const getfullData = getData.map((t) => t.customerData);
    const stringData = String(getfullData);
    return stringData;
  } catch (error) {
    console.error("Problem to get agent configuration data", error);
    console.error("Message:", error.message);
  }
}