import axios, { AxiosResponse } from "axios";

import { apiConfig } from "../config/ApiConfig";

interface ClockifyUser { id: string, name: string, defaultWorkspace: string }

export async function getUser() {
  const url = `${apiConfig.rootApiUrl}/user`;
  try {
    const response: AxiosResponse<ClockifyUser> = await axios.get(url, apiConfig.req);
    // console.log(JSON.stringify(response));
  } catch (e) {
    console.error("Ahhhhh!", e);
  }
}
