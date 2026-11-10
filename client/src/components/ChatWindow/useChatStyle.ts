import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export type ChatStyle = {
  backgroundChat?: string;
  backgroundInsideChat?: string;
  chatTextColor?: string;
  chatWelcomeText?: string;
};

export const DEFAULT_WELCOME_TEXT =
  "Hi! 👋 I'm your AI assistant. I can tell you more about Kamil – his projects, experience, and creative ideas. Ask me about his portfolio, technologies, what I'm currently working on, or what repositories I have on GitHub. 🚀";

export function useChatStyle() {
  const [chatStyle, setChatStyle] = useState<ChatStyle>({});

  useEffect(() => {
    axios
      .get<ChatStyle>(`${API_URL}chatStyle`)
      .then((response) => setChatStyle(response.data))
      .catch((err) => console.error("Chat style error:", err.message));
  }, []);

  return chatStyle;
}
