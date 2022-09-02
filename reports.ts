import axios from "axios";

import { ApiConfig } from "./ApiConfig";

export async function getSummaryReport(config: ApiConfig) {
  const url = `${config.reportsApiUrl}/summary`;
  const reqData = {
    dateRangeStart: "2022-08-08T00:00:00.000",
    dateRangeEnd: "2022-08-28T00:00:00.000",
    summaryFilter: {
      groups: [
        "CLIENT",
        "PROJECT",
        "USER"
      ]
    }
  };

  try {
    const response = await axios.post(url, reqData, config.req);
    // console.log(JSON.stringify(response));
  } catch (e) {
    console.error("Ahhhhh!", e);
  }
}

