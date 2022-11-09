import { Command, Option } from "commander";
import log from "../config/logger";
import { uploadToS3Async } from "../lib/s3-client";
import { outputDataAsync, OutputOptions } from "./output-config";

jest.mock("../lib/s3-client");
jest.mock("../config/logger");

const mockedUploadToS3Async = jest.mocked(uploadToS3Async);
const mockedLog = jest.mocked(log);

describe("outputDataAsync", () => {
  let options;

  const payload = { a: 1, b: 2 };

  beforeEach(() => {
    options = {
      format: "json",
      target: "stdout"
    } as OutputOptions;
  });

  it("throws when the format is invalid", async () => {
    options.format = "xml";

    await expect(outputDataAsync(options, payload)).rejects.toThrow(Error);
  });

  it("throws when the target type is invalid", async () => {
    options.target = "unknown";

    await expect(outputDataAsync(options, payload)).rejects.toThrow(Error);
  });

  describe("output=stdout", () => {
    beforeEach(() => {
      options.target = "stdout";
    });

    it("outputs the data to the console", async () => {
      await outputDataAsync(options, payload);

      expect(log.info).toHaveBeenCalledWith(expect.stringContaining(JSON.stringify(payload, null, 2)));
    });
  });

  describe("output=s3", () => {
    beforeEach(() => {
      options.target = "s3";
      options.destination = "in-the-clouds";
      options.key = "file-name.json";
    });

    it("throws when no destination has been specified", async () => {
      options.destination = "";

      await expect(outputDataAsync(options, payload)).rejects.toThrow(Error);
    });

    it("throws when no key has been specified", async () => {
      options.key = "";

      await expect(outputDataAsync(options, payload)).rejects.toThrow(Error);
    });

    it("invokes the s3 client to send the data to s3", async () => {
      await outputDataAsync(options, payload);

      expect(mockedUploadToS3Async).toHaveBeenCalledWith(
        options.destination,
        options.key,
        JSON.stringify(payload, null, 2),
        "application/json"
      );
    });
  });
});
