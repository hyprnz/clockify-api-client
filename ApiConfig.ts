const workspaceId = "62f2e35cb231d8663504739d"; // HyprActive Mock
// const workspaceId = "605a5bfe2ee8a33c7713614d"; // HYPR Innovation

const rootApiUrl = `https://api.clockify.me/api/v1`;

export interface ApiConfig {
  rootApiUrl: string,
  commonApiUrl: string,
  reportsApiUrl: string,
  req: {
    headers: { "X-Api-Key": string, "Content-Type": string }
  }
}

export const apiConfig = {
  rootApiUrl: rootApiUrl,
  commonApiUrl: `${rootApiUrl}/workspaces/${workspaceId}`,
  reportsApiUrl: `https://reports.api.clockify.me/v1/workspaces/${workspaceId}/reports`,
  req: {
    headers: {
      "X-Api-Key": process.env.API_KEY || "",
      "Content-Type": "application/json",
    },
  },
};
