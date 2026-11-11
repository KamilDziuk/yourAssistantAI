import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/apiUrl.ts";

export type ChatStyle = {
  backgroundChat?: string;
  backgroundInsideChat?: string;
  chatTextColor?: string;
  chatWelcomeText?: string;
  chatTitle?: string;
};

export const DEFAULT_CHAT_TITLE = "Your assistant AI";

export const DEFAULT_WELCOME_TEXT =
  "Hi! 👋 I'm your AI assistant. I can tell you more about Kamil – his projects, experience, and creative ideas. Ask me about his portfolio, technologies, what I'm currently working on, or what repositories I have on GitHub. 🚀";

export function useChatStyle(clientSlug?: string) {
  const [chatStyle, setChatStyle] = useState<ChatStyle>({});
  const [clientNotFound, setClientNotFound] = useState(false);

  useEffect(() => {
    axios
      .get<ChatStyle>(apiUrl("chatStyle", clientSlug))
      .then((response) => setChatStyle(response.data))
      .catch((err) => {
        if (err.response?.status === 404) {
          setClientNotFound(true);
        }
        console.error("Chat style error:", err.message);
      });
  }, [clientSlug]);

  return { chatStyle, clientNotFound };
}
