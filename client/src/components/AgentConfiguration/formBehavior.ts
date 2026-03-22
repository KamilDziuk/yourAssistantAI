import axios from "axios";
import { useState } from "react";

export function useMenuBehaviorAfterSending() {
  const [clientGuidelines, setClientGuidelines] = useState("");
  const [successfulSending, setSuccessfulSending] = useState(true);
  const [sendingError, setSendingError] = useState(true);

  // Function variable for sending data from the form
  const sendData = (e: any) => {
    e.preventDefault();

    // Sending form data to the /contact endpoint using axios
    axios
      .post("http://localhost:3003/contact", {
        clientGuidelines,
      })
      .then(() => {
        // Display success message on page after 2s show form
        setTimeout(() => {
          setSuccessfulSending(true);
        }, 4000);
        setSuccessfulSending(false);
        setSendingError(false);
      })
      .catch((err) => {
        // Display failure message on page after 2s show form
        setTimeout(() => {
          setSuccessfulSending(true);
        }, 2000);
        setSuccessfulSending(false);
        setSendingError(true);
        console.error("error", err.message);
      });
  };
  // Returning constant variables from the menuBehaviorAfterSending function
  return {
    successfulSending,
    sendingError,
    sendData,
    clientGuidelines,
    setClientGuidelines,
  };
}
