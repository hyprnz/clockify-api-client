import { Command } from "commander";
import { getDetailedReport, getSummaryReport } from "../services/reports";
import { configureOutputModes, outputDataAsync, OutputOptions } from "./output-config";

export function generateReportsCommand(program: Command) {
  const baseCommand = program.command("reports").description("Interact with clockify reporting data");

  var lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  lastMonth.setHours(0, 0, 0, 0); // Zero the time component

  var now = new Date();
  now.setHours(0, 0, 0, 0); // Zero the time component

  const summaryCommand = baseCommand.command("summary").description("Fetch summary report data");
  configureOutputModes(summaryCommand);
  summaryCommand
    .option("--start <date>", "ISO8601 formatted start date; defaults to 1 month before now", lastMonth.toISOString())
    .option("--end <date>", "ISO8601 formatted end date; defaults to now", now.toISOString())
    .option("--filterGroups [filterGroups]", "The summary filter groups to use", ["CLIENT", "PROJECT", "USER"])
    .action(async (options: SummaryReportOptions) => {
      const result = await getSummaryReport(options.start, options.end, options.filterGroups);
      await outputDataAsync(options, result);
    });

  const detailCommand = baseCommand.command("detail").description("Fetch detailed report data");
  configureOutputModes(detailCommand);
  detailCommand
    .option("--start <date>", "ISO8601 formatted start date; defaults to 1 month before now", lastMonth.toISOString())
    .option("--end <date>", "ISO8601 formatted end date; defaults to now", now.toISOString())
    .option("--page <page>", "The page number to fetch", "1")
    .option("--pageSize <pageSize>", "The number of items per page to fetch", "10")
    .action(async (options: DetailedReportOptions) => {
      const result = await getDetailedReport(options.start, options.end, options.page, options.pageSize);
      await outputDataAsync(options, result);
    });
}

interface SummaryReportOptions extends OutputOptions {
  start: string;
  end: string;
  filterGroups: [string];
}

interface DetailedReportOptions extends OutputOptions {
  start: string;
  end: string;
  page: number;
  pageSize: number;
}
