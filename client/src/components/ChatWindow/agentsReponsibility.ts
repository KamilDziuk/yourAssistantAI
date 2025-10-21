import { gitHubAbout, gitHubRepo } from "../../GitHubAPI/gitHubUser";

export default async function agentsReponsibility(customerQuestion: string) {
  try {

    // if local server -> example: localhost:3002/ask
    // if external server -> /ask
    const API_URL = "http://localhost:3002/ask";
    const dataDecode = await gitHubAbout();
    const data = await gitHubRepo();
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: customerQuestion,
        gitAbout: String(dataDecode),
        gitRepo: String(data),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failure sending data from user query to server", error);
    throw new Error(
      `Failure sending data from user query to server : ${
        (error as Error).message || "Unknown error"
      }`
    );
  }
}
