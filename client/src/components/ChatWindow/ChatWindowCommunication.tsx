import chatWindowStyles from "./ChatWindow.module.css";
import { DEFAULT_WELCOME_TEXT, type ChatStyle } from "./useChatStyle.ts";

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
  writing: any,
  chatStyle: ChatStyle
) {
  const welcomeText = chatStyle.chatWelcomeText || DEFAULT_WELCOME_TEXT;

  return (
    <>
      <div
        ref={refe}
        className={chatWindowStyles.responseBox}
        style={{ background: chatStyle.backgroundInsideChat }}
      >
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

              handleSend(welcomeText);
              setShowQuickStartButton(true);
            }}
            className={chatWindowStyles.quickStart}
            style={{
              background: chatStyle.backgroundInsideChat,
              color: chatStyle.chatTextColor,
            }}
          >
            {welcomeText}
          </div>
        )}
        <div className={chatWindowStyles.loadingReplies}></div>
        {writing}
      </div>
    </>
  );
}
