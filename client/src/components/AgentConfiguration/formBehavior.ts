import axios from "axios";
import { useState } from "react";

export function useMenuBehaviorAfterSending() {
  const [clientGuidelines, setClientGuidelines] = useState("");
  const [successfulSending, setSuccessfulSending] = useState(true);
  const [sendingError, setSendingError] = useState(true);


  
  // Returning constant variables from the menuBehaviorAfterSending function
  return {
    successfulSending,
    sendingError,
    sendMail,
    clientGuidelines,
    setClientGuidelines,
  };
}