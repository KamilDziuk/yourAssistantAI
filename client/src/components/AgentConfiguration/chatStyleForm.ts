import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DEFAULT_WELCOME_TEXT,
  useChatStyle,
} from "../ChatWindow/useChatStyle.ts";
import { apiUrl } from "../../utils/apiUrl.ts";

const DEFAULT_CHAT_STYLE = {
  backgroundChat: "#050537",
  backgroundInsideChat: "#0d0d0d",
  chatTextColor: "#cccccc",
  chatWelcomeText: DEFAULT_WELCOME_TEXT,
};

export type ChatStyleField = keyof typeof DEFAULT_CHAT_STYLE;

type SaveStatus = "idle" | "saved" | "error";

export function useChatStyleForm() {
  const { client: clientSlug, token } = useParams<{
    client?: string;
    token: string;
  }>();
  const { chatStyle: savedChatStyle } = useChatStyle(clientSlug);
  const [chatStyle, setChatStyle] = useState(DEFAULT_CHAT_STYLE);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    setChatStyle((current) => ({ ...current, ...savedChatStyle }));
  }, [savedChatStyle]);

  const updateField = (field: ChatStyleField, value: string) => {
    setChatStyle((current) => ({ ...current, [field]: value }));
  };

  const saveChatStyle = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(apiUrl(`${token}/chatStyle`, clientSlug), chatStyle)
      .then(() => setSaveStatus("saved"))
      .catch((err) => {
        setSaveStatus("error");
        console.error("error", err.response?.data?.error || err.message);
      })
      .finally(() => {
        setTimeout(() => setSaveStatus("idle"), 4000);
      });
  };

  return { chatStyle, updateField, saveChatStyle, saveStatus };
}
