import { Command } from "commander";

export function generateClientsCommand(program: Command) {
  program.command("clients").description("Interact with clockify client data");
}
