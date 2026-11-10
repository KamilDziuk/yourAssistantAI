import type { ChatStyle } from "./useChatStyle.ts";

export default function ChatWindowInput(
  hideTextInput: any,
  setHideTextInput: any,
  chatWindowStyles: any,
  listeningLockInputValue: any,
  customerQuestion: any,
  listeningInputValue: any,
  setListeningClickQuickStartButton: any,
  setCustomerQuestion: any,
  chatStyle: ChatStyle
) {
  const inputStyle = {
    background: chatStyle.backgroundInsideChat,
    color: listeningLockInputValue ? undefined : chatStyle.chatTextColor,
  };

  return (
    <>
      {hideTextInput ? (
        <input
          onClick={() => {
            setHideTextInput(!hideTextInput);
          }}
          className={chatWindowStyles.askInputData}
          style={inputStyle}
          placeholder="Enter your message..."
          required
          value={""}
        />
      ) : (
        <input
          disabled={listeningLockInputValue ? true : false}
          className={`${
            listeningLockInputValue
              ? chatWindowStyles.inputTextColor
              : chatWindowStyles.askInputData
          }`}
          style={inputStyle}
          required
          placeholder="Enter your message..."
          value={customerQuestion}
          onChange={(e) => {
            if (e.target.value) {
              listeningInputValue(true);
            }
            setListeningClickQuickStartButton(false);
            setCustomerQuestion(
              listeningLockInputValue
                ? "Query limit exceeded. Please try again later."
                : e.target.value
            );
          }}
        />
      )}
    </>
  );
}
