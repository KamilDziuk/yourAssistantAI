import mongoDB from "./configDB.js";
import ConversationHistory from "./models/conversationHistoryModel.js";

export async function addingConversationHistory(
  questionFromCustomer,
  answerFromOpenAI
) {
  await mongoDB();

  await new ConversationHistory({
    question: questionFromCustomer,
    answer: answerFromOpenAI,
  }).save();

  console.log(
    `Successfully added Question: ${questionFromCustomer}, Answer: ${answerFromOpenAI}`
  );
}
function deletingDataFromDatabase() {
  setTimeout(async () => {
    await ConversationHistory.deleteMany({});
  }, 100000);
}

export async function gethistory() {
  await mongoDB();
  const getData = await ConversationHistory.find().select("question -_id");
  deletingDataFromDatabase();
  const getfullData = getData.map((t) => t.question);
  const stringData = String(getfullData);
  return stringData;
}
