import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DEFAULT_CHAT_TITLE,
  DEFAULT_WELCOME_TEXT,
  useChatStyle,
  type ChatStyle,
} from "../ChatWindow/useChatStyle.ts";
import { resizeLogo } from "../../utils/resizeImage.ts";
import { apiUrl } from "../../utils/apiUrl.ts";

export type ChatStyleFormValues = Required<ChatStyle>;

const DEFAULT_CHAT_STYLE: ChatStyleFormValues = {
  backgroundChat: "#050537",
  backgroundInsideChat: "#0d0d0d",
  chatTextColor: "#cccccc",
  chatWelcomeText: DEFAULT_WELCOME_TEXT,
  chatTitle: DEFAULT_CHAT_TITLE,
  chatHeaderType: "text",
  chatLogo: "",
};

type SaveStatus = "idle" | "saved" | "error";

export function useChatStyleForm() {
  const { client: clientSlug, token } = useParams<{
    client?: string;
    token: string;
  }>();
  const { chatStyle: savedChatStyle } = useChatStyle(clientSlug);
  const [chatStyle, setChatStyle] = useState(DEFAULT_CHAT_STYLE);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [logoError, setLogoError] = useState("");

  useEffect(() => {
    setChatStyle((current) => ({ ...current, ...savedChatStyle }));
  }, [savedChatStyle]);

  const updateField = <Field extends keyof ChatStyleFormValues>(
    field: Field,
    value: ChatStyleFormValues[Field],
  ) => {
    setChatStyle((current) => ({ ...current, [field]: value }));
  };

  const uploadLogo = (file: File | undefined) => {
    if (!file) {
      return;
    }

    resizeLogo(file)
      .then((logo) => {
        setLogoError("");
        updateField("chatLogo", logo);
      })
      .catch((err) => setLogoError(err.message));
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

  return {
    chatStyle,
    updateField,
    uploadLogo,
    logoError,
    saveChatStyle,
    saveStatus,
  };
}
