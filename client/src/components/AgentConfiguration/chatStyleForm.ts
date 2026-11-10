import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DEFAULT_WELCOME_TEXT,
  useChatStyle,
} from "../ChatWindow/useChatStyle.ts";

const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_CHAT_STYLE = {
  backgroundChat: "#050537",
  backgroundInsideChat: "#0d0d0d",
  chatTextColor: "#cccccc",
  chatWelcomeText: DEFAULT_WELCOME_TEXT,
};

export type ChatStyleField = keyof typeof DEFAULT_CHAT_STYLE;

type SaveStatus = "idle" | "saved" | "error";

export function useChatStyleForm() {
  const { token } = useParams<{ token: string }>();
  const savedChatStyle = useChatStyle();
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
      .post(`${API_URL}${token}/chatStyle`, chatStyle)
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
