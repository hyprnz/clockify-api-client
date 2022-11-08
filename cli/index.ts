import { Command } from "commander";
import { generateClientsCommand } from "./clients-command";
import { generateProjectsCommand } from "./projects-command";
import { generateReportsCommand } from "./reports-command";
import { generateUsersCommand } from "./users-command";

export function parseCliArgs() {
  const program = new Command();

  generateClientsCommand(program);
  generateProjectsCommand(program);
  generateReportsCommand(program);
  generateUsersCommand(program);

  program.parse();
}
