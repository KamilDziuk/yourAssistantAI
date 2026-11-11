import { useParams } from "react-router-dom";
import Icon from "../Icon/Icon";
import iconStyle from "../Icon/Icon.module.css";
import chatWindowStyles from "./ChatWindow.module.css";
import { useChatScroll, useChatWindow } from "./useChatWindow.ts";
import { DEFAULT_CHAT_TITLE, useChatStyle } from "./useChatStyle.ts";
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
  const { client: clientSlug } = useParams<{ client: string }>();
  const { chatStyle, clientNotFound } = useChatStyle(clientSlug);

  const handleSend = (contentQuestion: string) => {
    toggleTextInput(setHideTextInput, hideTextInput);
    addToCount(count, setCount, 1);
    clearCustomerQuestion(setCustomerQuestion);
    viewQueueContent(
      contentQuestion,
      listeningClickQuickStartButton,
      customerQuestion,
      setMessages,
      clientSlug
    );
  };

  if (clientNotFound) {
    return (
      <div className={chatWindowStyles.assistantWindow}>
        <div className={chatWindowStyles.mainWindowText}>
          This chat does not exist or is no longer available.
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={chatWindowStyles.assistantWindow}
        style={
          {
            background: chatStyle.backgroundChat,
            "--chat-text-color": chatStyle.chatTextColor,
          } as React.CSSProperties
        }
      >
        <div className={chatWindowStyles.mainWindowText}>
          {chatStyle.chatHeaderType === "logo" && chatStyle.chatLogo ? (
            <img
              src={chatStyle.chatLogo}
              alt={chatStyle.chatTitle || DEFAULT_CHAT_TITLE}
              className={chatWindowStyles.chatLogo}
            />
          ) : (
            chatStyle.chatTitle || DEFAULT_CHAT_TITLE
          )}
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
          ),
          chatStyle
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
            setCustomerQuestion,
            chatStyle
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
