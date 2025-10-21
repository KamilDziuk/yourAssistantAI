import Icon from "../Icon/Icon";
import iconStyle from "../Icon/Icon.module.css";
import chatWindowStyles from "./chatWindow.module.css";
import { useChatScroll, useChatWindow } from "./useChatWindow.ts";
import ChatWindowCommunication from "./ChatWindowCommunication.tsx";
import ChatWindowInput from "./ChatWindowInput.tsx";
import ChatWindowIcones from "./ChatWindowIcones.tsx";
import {
  toggleTextInput,
  addToCount,
  clearCustomerQuestion,
  viewQueueContent,
} from "./chatWindowLogic.ts";

export default function ChatWindow() {
  const [
    customerQuestion,
    setCustomerQuestion,
    showQuickStartButton,
    setShowQuickStartButton,
    messages,
    setMessages,
    hideTextInput,
    setHideTextInput,
    iconMovement,
    listeningInputValue,
    count,
    setCount,
    listeningLockInputValue,
    setListeningLockInputValue,
    listeningClickQuickStartButton,
    setListeningClickQuickStartButton,
  ] = useChatWindow();

  const refe = useChatScroll(messages);

  const handleSend = (contentQuestion: string) => {
    toggleTextInput(setHideTextInput, hideTextInput);
    addToCount(count, setCount, 1);
    clearCustomerQuestion(setCustomerQuestion);
    viewQueueContent(
      contentQuestion,
      listeningClickQuickStartButton,
      customerQuestion,
      setMessages
    );
  };

  return (
    <>
      <div className={chatWindowStyles.assistantWindow}>
        <code>v0.9.0-beta</code>
        <div className={chatWindowStyles.mainWindowText}>
          Your assistant AI
          <Icon
            iconStyle={`${iconStyle.cloudIcon} ${
              iconMovement && iconStyle.writingAnimation
            }`}
            iconName="io5:IoChatbubbleEllipsesOutline"
          />
        </div>

        {ChatWindowCommunication(
          showQuickStartButton,
          refe,
          setListeningClickQuickStartButton,
          messages,
          handleSend,
          setShowQuickStartButton,
          iconMovement && (
            <ChatWindowIcones
              userStyleElement={chatWindowStyles.question}
              userTextElement={chatWindowStyles.userTextElement}
              iconStyleElement={`${iconStyle.icon} ${iconStyle.muveAvatarEfect} `}
              iconName={"lu:LuUserRound"}
            >
              ...
            </ChatWindowIcones>
          )
        )}

        <div className={chatWindowStyles.communicationContener}>
          {ChatWindowInput(
            hideTextInput,
            setHideTextInput,
            chatWindowStyles,
            listeningLockInputValue,
            customerQuestion,
            listeningInputValue,
            setListeningClickQuickStartButton,
            setCustomerQuestion
          )}
          <button
            onClick={() => {
              {
                if (customerQuestion.length > 10 && !listeningLockInputValue) {
                  handleSend(customerQuestion);
                  setShowQuickStartButton(true);
                  setListeningLockInputValue(undefined);
                }
              }
            }}
            className={chatWindowStyles.sendAsk}
          >
            <Icon iconStyle={iconStyle.sendAsk} iconName="fi:FiSend" />
          </button>
        </div>
      </div>
    </>
  );
}
