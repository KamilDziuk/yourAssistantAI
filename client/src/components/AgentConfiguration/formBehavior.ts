import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
export function useMenuBehaviorAfterSending() {
  const [clientGuidelines, setClientGuidelines] = useState("");
  const [successfulSending, setSuccessfulSending] = useState(true);
  const [sendingError, setSendingError] = useState(true);

  const sendData = (e: any) => {
    e.preventDefault();

    axios
      .post(`${API_URL}contact`, {
        clientGuidelines,
      })
      .then(() => {
        setTimeout(() => {
          setSuccessfulSending(true);
        }, 4000);
        setSuccessfulSending(false);
        setSendingError(false);
      })
      .catch((err) => {
        setTimeout(() => {
          setSuccessfulSending(true);
        }, 2000);
        setSuccessfulSending(false);
        setSendingError(true);
        console.error("error", err.message);
      });
  };

  return {
    successfulSending,
    sendingError,
    sendData,
    clientGuidelines,
    setClientGuidelines,
  };
}
