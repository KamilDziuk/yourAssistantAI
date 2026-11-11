import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../utils/apiUrl";

type configurationSettingsParams = {
  client?: string;
  token: string;
};

export function useMenuBehaviorAfterSending() {
  const [clientGuidelines, setClientGuidelines] = useState("");
  const [successfulSending, setSuccessfulSending] = useState(true);
  const [sendingError, setSendingError] = useState(true);
  const { client: clientSlug, token } =
    useParams<configurationSettingsParams>();

  const sendData = (e: any) => {
    e.preventDefault();
    axios
      .post(apiUrl(`${token}/userInstructions`, clientSlug), {
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
        const message = err.response?.data?.error;

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
