import agentsReponsibility from "./agentsReponsibility.ts";
import { ChatWindowContnet } from "./ChatWindowContnet.tsx";
export const addToCount = (
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  numer: number
) => setCount(count + numer);

export const clearCustomerQuestion = (
  setCustomerQuestion: React.Dispatch<React.SetStateAction<string>>
) => setCustomerQuestion("");

export const toggleTextInput = (
  setHideTextInput: React.Dispatch<React.SetStateAction<boolean>>,
  hideTextInput: boolean
) => setHideTextInput(!hideTextInput);

export const responseChat = (contentQuestion: string) => {
  const reschat = agentsReponsibility(contentQuestion);
  return reschat;
};

export const allMessageContnet = (setMessages: any, view: any) => {
  setMessages((prevMessages: any) => [...prevMessages, ...view]);
};

export const viewQueueContent = (
  contentQuestion: string,
  listeningClickQuickStartButton: string,
  customerQuestion: string ,
  setMessages: string
) => {
  const reschat = responseChat(contentQuestion);
  const viewQueue = ChatWindowContnet(
    listeningClickQuickStartButton,
    customerQuestion,
    reschat
  );
  allMessageContnet(setMessages, viewQueue);
};

export const clearInput = (
  customerQuestion: string,
  setCustomerQuestion: React.Dispatch<React.SetStateAction<string>>
) => {
  if (customerQuestion === "Query limit exceeded. Please try again later.") {
    const clearText = setTimeout(() => {
      setCustomerQuestion("");
      clearTimeout(clearText);
    }, 20000);
  }
};
