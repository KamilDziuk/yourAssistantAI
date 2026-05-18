import { gitHubAbout, gitHubRepo } from "../../GitHubAPI/gitHubUser";
import { createRequestTimeout } from "../../utils/fetchTimeout";
const API_URL = import.meta.env.VITE_API_URL;
export default async function agentsReponsibility(customerQuestion: string) {
  try {
    const { controller, timeout } = createRequestTimeout();

    const API_URL_ASK = `${API_URL}ask`;
    const dataDecode = await gitHubAbout();
    const data = await gitHubRepo();

    const response = await fetch(API_URL_ASK, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: customerQuestion,
        gitAbout: String(dataDecode),
        gitRepo: String(data),
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failure sending data from user query to server", error);

    throw new Error(
      `Failure sending data from user query to server : ${
        (error as Error).message || "Unknown error"
      }`,
    );
  }
}
