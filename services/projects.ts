import axios from "axios";

import { ApiConfig } from "../config/ApiConfig";

interface Project {
  name: string,
  clientId: string,
  isBillable: boolean,
}

export async function addProject(config: ApiConfig, project: Project) {
  const url = `${config.commonApiUrl}/projects`;

  const reqData = {
    name: project.name,
    clientId: project.clientId,
    billable: project.isBillable,
  };

  try {
    await axios.post(url, reqData, config.req);
  } catch (e) {
    console.error("Ahhhhh!", e);
  }
}

