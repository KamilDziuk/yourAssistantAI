import axios from "axios";

async function gitHubUrl(url: string): Promise<any> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error");
      console.error(error.response?.status);
      console.error(error.message);
      console.error(error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

function excludeCharacters() {
  return /<(\/?)(|h[1-3]|p|br|div|a|img|)[^>]*>|Tools/gi;
}
export async function gitHubAbout(): Promise<string> {
  try {
    const data = await gitHubUrl(
      "https://api.github.com/repos/KamilDziuk/KamilDziuk/readme"
    );

    if (!data?.content) {
      throw new Error("No README content");
    }
    const dataDecode = atob(data.content);
    const disabledCharacters = excludeCharacters();
    return dataDecode.replace(disabledCharacters, "");
  } catch (error) {
    console.error("Problem in readme URL:", error);
    throw new Error(`Failed to download README: ${(error as Error).message}`);
  }
}

export async function gitHubRepo(): Promise<string[][]> {
  try {
    const data = await gitHubUrl(
      "https://api.github.com/users/kamilDziuk/repos"
    );

    return data.map((repo: any) => [
      repo.name,
      repo.html_url,
      repo.topics,
      repo.description,
    ]);
  } catch (error) {
    console.error("Problem in repos URL:", error);
    throw new Error(
      `Failed to download repositories: ${(error as Error).message}`
    );
  }
}
