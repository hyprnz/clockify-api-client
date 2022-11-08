import axios from "axios";

import { ApiConfig } from "../config/ApiConfig";

export async function addClients(config: ApiConfig, clients: string[]) {
  const url = `${config.commonApiUrl}/clients`;

  clients.forEach(async client => {
    const reqData = { name: client };

    try {
      await axios.post(url, reqData, config.req);
    } catch (e) {
      console.error("Ahhhhh!", e);
    }
  });
}

export async function showClients(config: ApiConfig) {
  const url = `${config.commonApiUrl}/clients?archived=false`;

  try {
    const response = await axios.get(url, config.req);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (e) {
    console.error("Ahhhhh!", e);
  }
}
