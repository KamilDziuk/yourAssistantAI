import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

type configurationSettingsParams = {
  token: string;
};

export function useMenuBehaviorAfterSending() {
  const [clientGuidelines, setClientGuidelines] = useState("");
  const [successfulSending, setSuccessfulSending] = useState(true);
  const [sendingError, setSendingError] = useState(true);
  const { token } = useParams<configurationSettingsParams>();

  const sendData = (e: any) => {
    e.preventDefault();
    axios
      .post(`${API_URL}${token}/userInstructions`, {
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
        const status = err.response?.status;
        const message = err.response?.data?.message;

        if (status === 429) {
          console.warn("Limiter:", message);
        }

        
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
