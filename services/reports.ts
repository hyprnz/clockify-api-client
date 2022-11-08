import axios from "axios";

import { apiConfig } from "../config/ApiConfig";

export async function getSummaryReport(dateRangeStart: string, dateRangeEnd: string, filterGroups: [string]) {
  const url = `${apiConfig.reportsApiUrl}/summary`;
  const reqData = {
    dateRangeStart,
    dateRangeEnd,
    summaryFilter: {
      groups: filterGroups
    }
  };

  try {
    const response = await axios.post(url, reqData, apiConfig.req);
    return response.data;
  } catch (e) {
    console.error("Ahhhhh!", e);
  }
}

export async function getDetailedReport(dateRangeStart: string, dateRangeEnd: string, page: number, pageSize: number) {
  const url = `${apiConfig.reportsApiUrl}/detailed`;
  const reqData = {
    dateRangeStart,
    dateRangeEnd,
    detailedFilter: {
      page,
      pageSize
    },
    exportType: "JSON"
  };

  try {
    const response = await axios.post(url, reqData, apiConfig.req);
    return response.data;
  } catch (e) {
    console.error("Ahhhhh!", e);
  }
}
