import { useState, useEffect, useRef } from "react";
import { addCookie, getCookie } from "../../Cookies/cookies.ts";
import { clearInput } from "./chatWindowLogic.ts";

export function useChatWindow() {
  const [customerQuestion, setCustomerQuestion] = useState<string>("");
  const [showQuickStartButton, setShowQuickStartButton] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [hideTextInput, setHideTextInput] = useState<boolean>(false);
  const [listeningInputValue, setListeningInputValue] =
    useState<boolean>(false);
  const [listeningLockInputValue, setListeningLockInputValue] =
    useState<boolean>(false);
  const [listeningClickQuickStartButton, setlisteningClickQuickStartButton] =
    useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [showLockText, setShowLockText] = useState<any>("");
  const get = getCookie();
  clearInput(customerQuestion, setCustomerQuestion);
  useEffect(() => {
    if (get === "4") {
      setCustomerQuestion("Query limit exceeded. Please try again later.");

      setListeningLockInputValue(true);
    } else if (!get) {
      setListeningLockInputValue(false);
      setCustomerQuestion("");
      setShowLockText(customerQuestion);
    }
  }, [get]);

  useEffect(() => {
    if (count === 4) {
      addCookie();
      setCount(0);
    }
  }, [count]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setListeningInputValue(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [listeningInputValue, listeningLockInputValue]);

  return [
    customerQuestion,
    setCustomerQuestion,
    showQuickStartButton,
    setShowQuickStartButton,
    messages,
    setMessages,
    hideTextInput,
    setHideTextInput,
    listeningInputValue,
    setListeningInputValue,
    count,
    setCount,
    listeningLockInputValue,
    setListeningLockInputValue,
    listeningClickQuickStartButton,
    setlisteningClickQuickStartButton,
    showLockText,
    setShowLockText,
    get,
  ];
}

export function useChatScroll(message: string[]) {
  const refe = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (refe.current) {
      refe.current.scrollTop = refe.current.scrollHeight;
    }
  }, [message]);
  return refe;
}
