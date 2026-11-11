import { gitHubAbout, gitHubRepo } from "../../GitHubAPI/gitHubUser";
import { createRequestTimeout } from "../../utils/fetchTimeout";
import { apiUrl } from "../../utils/apiUrl";

import axios from "axios";
export default async function agentsReponsibility(
  customerQuestion: string,
  clientSlug?: string,
) {
  try {
    const { controller, timeout } = createRequestTimeout();
    const dataDecode = await gitHubAbout();
    const data = await gitHubRepo();
    const response = await axios.post(
      apiUrl("ask", clientSlug),
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
    const message = err.response?.data?.error;

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
