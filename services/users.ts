import axios, { AxiosResponse } from "axios";

import { apiConfig } from "../config/ApiConfig";
import { handleHttpError } from "./common";

interface ClockifyUser {
  id: string;
  name: string;
  defaultWorkspace: string;
}

export async function getUser() {
  const url = `${apiConfig.rootApiUrl}/user`;
  try {
    const response: AxiosResponse<ClockifyUser> = await axios.get(url);
    return response.data;
  } catch (e) {
    handleHttpError(e);
  }
}
