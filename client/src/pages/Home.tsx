import ChatWindow from "../components/ChatWindow/ChatWindow";
import {
  DEFAULT_CHAT_TITLE,
  useChatStyle,
} from "../components/ChatWindow/useChatStyle";
import chatWindowStyles from "../components/ChatWindow/ChatWindow.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const { client: clientSlug } = useParams<{ client: string }>();
  const { chatStyle } = useChatStyle(clientSlug);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ChatWindow />
      {showPreloader && (
        <div
          style={{
            position: "absolute",
            background: " #000000f8",
            //  background: chatStyle.backgroundChat,
            padding: "0",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            textAlign: "center",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "0",
            zIndex: 999999,
          }}
        >
          {chatStyle.chatHeaderType === "logo" && chatStyle.chatLogo ? (
            <img
              src={chatStyle.chatLogo}
              alt={chatStyle.chatTitle || DEFAULT_CHAT_TITLE}
              className={chatWindowStyles.chatLogo}
            />
          ) : (
            chatStyle.chatTitle || DEFAULT_CHAT_TITLE
          )}
        </div>
      )}
    </>
  );
}
