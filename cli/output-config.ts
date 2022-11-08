import { Command, Option } from "commander";

export function configureOutputModes(cmd: Command) {
  cmd
    .addOption(
      new Option("-f, --format <format>", "The format to output the data in.").default("JSON").choices(["JSON"])
    )
    .option(
      "-t, --target <target>",
      "The destination file to output the data to. If not specified then output will be echoed to the terminal."
    );
}

export function outputData(options: OutputOptions, data: Object) {
  let result;
  switch (options.format.toLowerCase()) {
    case "json":
      result = JSON.stringify(data, null, 2);
      break;
    default:
      throw new Error(`invalid output format specified: '${options.format}'.`);
  }

  if (!options.target) {
    console.log(result);
  } else {
    console.log(`TODO - output to file at ${options.target}`);
  }
}

export interface OutputOptions {
  format: string;
  target: string;
}
