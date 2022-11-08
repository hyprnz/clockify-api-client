import axios, { AxiosResponse } from "axios";

import { ApiConfig } from "../config/ApiConfig";

interface ClockifyUser { id: string, name: string, defaultWorkspace: string }

export async function getUser(config: ApiConfig) {
  const url = `${config.rootApiUrl}/user`;
  try {
    const response: AxiosResponse<ClockifyUser> = await axios.get(url, config.req);
    // console.log(JSON.stringify(response));
  } catch (e) {
    console.error("Ahhhhh!", e);
  }
}
