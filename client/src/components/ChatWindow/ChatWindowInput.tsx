export default function ChatWindowInput(
  hideTextInput: any,
  setHideTextInput: any,
  chatWindowStyles: any,
  listeningLockInputValue: any,
  customerQuestion: any,
  listeningInputValue: any,
  setListeningClickQuickStartButton: any,
  setCustomerQuestion: any
) {
  return (
    <>
      {hideTextInput ? (
        <input
          onClick={() => {
            setHideTextInput(!hideTextInput);
          }}
          className={chatWindowStyles.askInputData}
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
