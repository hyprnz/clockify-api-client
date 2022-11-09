import { Command, Option } from "commander";
import log from "../config/logger";
import { uploadToS3Async } from "../lib/s3-client";

export function configureOutputModes(cmd: Command) {
  cmd
    .addOption(
      new Option("-f, --format <format>", "The format to output the data in.").default("JSON").choices(["JSON"])
    )
    .addOption(
      new Option("-t, --target <target>", "The destination to output the data to.")
        .default("stdout")
        .choices(["stdout", "s3"])
    )
    .option(
      "-d, --destination <destination>",
      "The destination to output the data to. For target=s3, this is the name of the s3 bucket. For target=stdout, this does nothing."
    )
    .option(
      "-k, --key <key>",
      "The key to use for the destination. For target=s3, this is the name of the file in the s3 bucket. For target=stdout, this does nothing."
    );
}

export async function outputDataAsync(options: OutputOptions, data: Object) {
  let result, contentType;
  switch (options.format.toLowerCase()) {
    case "json":
      result = JSON.stringify(data, null, 2);
      contentType = "application/json";
      break;
    default:
      throw new Error(`invalid output format specified: '${options.format}'.`);
  }

  switch (options.target.toLowerCase()) {
    case "stdout":
      log.info("\n" + result);
      break;
    case "s3":
      if (!options.destination) {
        throw new Error(`invalid destination specified to upload the data to s3: '${options.destination}'.`);
      }
      if (!options.key) {
        throw new Error(`invalid key specified to upload the data to s3: '${options.key}'.`);
      }
      await uploadToS3Async(options.destination, options.key, result, contentType);
      break;
    default:
      throw new Error(`invalid target specified: '${options.target}'.`);
  }
}

export interface OutputOptions {
  format: string;
  target: string;
  destination?: string;
  key?: string;
}
