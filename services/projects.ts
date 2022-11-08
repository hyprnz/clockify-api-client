import axios from "axios";

import { apiConfig } from "../config/ApiConfig";
import { handleHttpError } from "./common";

interface Project {
  name: string;
  clientId: string;
  isBillable: boolean;
}

export async function addProject(project: Project) {
  const url = `${apiConfig.commonApiUrl}/projects`;

  const reqData = {
    name: project.name,
    clientId: project.clientId,
    billable: project.isBillable
  };

  try {
    const response = await axios.post(url, reqData, apiConfig.req);
    return response.data;
  } catch (e) {
    handleHttpError(e);
  }
}
