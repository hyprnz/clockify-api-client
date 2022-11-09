import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const hypractiveMockWorkspaceId = "62f2e35cb231d8663504739d"; // HyprActive Mock
const hyprInnovationWorkspaceId = "605a5bfe2ee8a33c7713614d"; // HYPR Innovation

const workspaceId = process.env.WORKSPACE_ID || hypractiveMockWorkspaceId;

const rootApiUrl = `https://api.clockify.me/api/v1`;

axios.defaults.headers.common["X-Api-Key"] = process.env.API_KEY || "";
axios.defaults.headers.common["Content-Type"] = "application/json";

export interface ApiConfig {
  rootApiUrl: string;
  commonApiUrl: string;
  reportsApiUrl: string;
}

export const apiConfig = {
  rootApiUrl: rootApiUrl,
  commonApiUrl: `${rootApiUrl}/workspaces/${workspaceId}`,
  reportsApiUrl: `https://reports.api.clockify.me/v1/workspaces/${workspaceId}/reports`
};
