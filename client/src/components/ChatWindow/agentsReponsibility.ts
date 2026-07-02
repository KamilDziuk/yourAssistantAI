import { gitHubAbout, gitHubRepo } from "../../GitHubAPI/gitHubUser";
import { createRequestTimeout } from "../../utils/fetchTimeout";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export default async function agentsReponsibility(customerQuestion: string) {
  try {
    const { controller, timeout } = createRequestTimeout();
    const dataDecode = await gitHubAbout();
    const data = await gitHubRepo();
    const API_URL_ASK = `${API_URL}ask`;
    const response = await axios.post(
      API_URL_ASK,
      {
        messages: customerQuestion,
        gitAbout: String(dataDecode),
        gitRepo: String(data),
      },
      {
        signal: controller.signal
      },
    );

    clearTimeout(timeout);

    return response.data;
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 429) {
      console.warn(" Rate limit:", message);
      throw new Error(message || "Too many requests");
    }

    console.error("Request error:", message || err.message);

    throw new Error(
      message || err.message || "Failure sending data from server",
    );
  }
}
