import axios from "axios";

import { apiConfig } from "../config/ApiConfig";
import { handleHttpError } from "./common";

export async function addClients(clients: string[]) {
  const url = `${apiConfig.commonApiUrl}/clients`;

  clients.forEach(async (client) => {
    const reqData = { name: client };

    try {
      const response = await axios.post(url, reqData);
      return response.data;
    } catch (e) {
      handleHttpError(e);
    }
  });
}

export async function getClients() {
  const url = `${apiConfig.commonApiUrl}/clients?archived=false`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    handleHttpError(e);
  }
}
