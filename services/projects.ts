import axios from "axios";

import { apiConfig } from "../config/ApiConfig";

interface Project {
  name: string,
  clientId: string,
  isBillable: boolean,
}

export async function addProject(project: Project) {
  const url = `${apiConfig.commonApiUrl}/projects`;

  const reqData = {
    name: project.name,
    clientId: project.clientId,
    billable: project.isBillable,
  };

  try {
    await axios.post(url, reqData, apiConfig.req);
  } catch (e) {
    console.error("Ahhhhh!", e);
  }
}

