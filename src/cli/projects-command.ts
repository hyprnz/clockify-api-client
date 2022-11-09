import { Command } from "commander";

export function generateProjectsCommand(program: Command) {
  program.command("projects").description("Interact with clockify project data");
}
