
import chatWindowStyles from "./ChatWindow.module.css";


import type {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
export default function ChatWindowCommunication(
  showQuickStartButton: boolean,
  refe: any,
  setListeningClickQuickStartButton: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  messages: any,
  handleSend: any,
  setShowQuickStartButton: React.Dispatch<React.SetStateAction<boolean>>,
  writing: any
) {
  return (
    <>
      <div ref={refe} className={chatWindowStyles.responseBox}>
        {messages.map(
          (
            msg:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactPortal
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined,
            index: Key | null | undefined
          ): any => (
            <div key={index}>{msg}</div>
          )
        )}

        {!showQuickStartButton && (
          <div

            onClick={() => {
              setListeningClickQuickStartButton(true);

              handleSend(
                "Hi! 👋 I'm your AI assistant. I can tell you more about Kamil – his projects, experience, and creative classNameeas. Ask me about his portfolio, technologies, what I'm currently working on, or what repositories I have on GitHub. 🚀"
              );
              setShowQuickStartButton(true);
            }}
            className={chatWindowStyles.quickStart}
          >
            Hi! 👋 I'm your AI assistant. I can tell you more about Kamil – his
            projects, experience, and creative classNameeas. Ask me about his
            portfolio, technologies, what I'm currently working on, or what
            repositories I have on GitHub. 🚀
          </div>
        )}
        <div className={chatWindowStyles.loadingReplies}></div>
        {writing}
      </div>
    </>
  );
}
