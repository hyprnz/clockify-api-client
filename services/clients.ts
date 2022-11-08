import axios from "axios";

import { apiConfig } from "../config/ApiConfig";

export async function addClients(clients: string[]) {
  const url = `${apiConfig.commonApiUrl}/clients`;

  clients.forEach(async client => {
    const reqData = { name: client };

    try {
      await axios.post(url, reqData, apiConfig.req);
    } catch (e) {
      console.error("Ahhhhh!", e);
    }
  });
}

export async function showClients() {
  const url = `${apiConfig.commonApiUrl}/clients?archived=false`;

  try {
    const response = await axios.get(url, apiConfig.req);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (e) {
    console.error("Ahhhhh!", e);
  }
}
