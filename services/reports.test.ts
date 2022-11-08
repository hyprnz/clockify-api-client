import axios from "axios";
import { apiConfig } from "../config/ApiConfig";
import { handleHttpError } from "./common";
import { getDetailedReport, getSummaryReport } from "./reports";

jest.mock("axios");
jest.mock("../config/ApiConfig");
jest.mock("./common");

const mockedAxios = jest.mocked(axios);

beforeEach(() => {
  apiConfig.reportsApiUrl = "https://api.example.org/reports";
});

describe("getSummaryReport", () => {
  const dateStart = "2022-05-09";
  const dateEnd = "2022-09-05";
  const filterGroups = ["ABC"];

  it("passes the expected arguments to the API", async () => {
    await getSummaryReport(dateStart, dateEnd, filterGroups);

    const expectedPayload = {
      dateRangeStart: dateStart,
      dateRangeEnd: dateEnd,
      summaryFilter: {
        groups: filterGroups
      }
    };

    expect(axios.post).toHaveBeenCalledWith("https://api.example.org/reports/summary", expectedPayload);
  });

  it("handles exceptions thrown from the API call", async () => {
    const error = new Error();
    mockedAxios.post.mockRejectedValue(error);

    await getSummaryReport(dateStart, dateEnd, filterGroups);

    expect(handleHttpError).toHaveBeenCalledWith(error);
  });
});

describe("getDetailedReport", () => {
  const dateStart = "2022-05-09";
  const dateEnd = "2022-09-05";
  const page = 1;
  const pageSize = 10;

  it("passes the expected arguments to the API", async () => {
    await getDetailedReport(dateStart, dateEnd, page, pageSize);

    const expectedPayload = {
      dateRangeStart: dateStart,
      dateRangeEnd: dateEnd,
      detailedFilter: {
        page,
        pageSize
      },
      exportType: "JSON"
    };

    expect(axios.post).toHaveBeenCalledWith("https://api.example.org/reports/detailed", expectedPayload);
  });

  it("handles exceptions thrown from the API call", async () => {
    const error = new Error();
    mockedAxios.post.mockRejectedValue(error);

    await getDetailedReport(dateStart, dateEnd, page, pageSize);

    expect(handleHttpError).toHaveBeenCalledWith(error);
  });
});
