import { AxiosError, AxiosResponse } from "axios";
import log from "../config/logger";
import { handleHttpError } from "./common";

jest.mock("../config/logger");

const mockedLog = jest.mocked(log);

describe("handleHttpError", () => {
  it("throws the specified error", async () => {
    const err = new Error();
    expect(() => handleHttpError(err)).toThrowError(err);
  });

  it("logs errors when the error is an AxiosError", async () => {
    const response = {
      status: 400,
      statusText: "bad request"
    } as AxiosResponse<unknown, any>;
    const err = new AxiosError("oh dear", "", undefined, null, response);

    expect(() => handleHttpError(err)).not.toThrow();
    expect(mockedLog.error).toHaveBeenCalledWith(expect.stringContaining(response.status + ""));
    expect(mockedLog.error).toHaveBeenCalledWith(expect.stringContaining(response.statusText));
    expect(mockedLog.error).toHaveBeenCalledWith(expect.stringContaining(err.message));
  });
});
