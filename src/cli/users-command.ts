import { Command } from "commander";

export function generateUsersCommand(program: Command) {
  program.command("users").description("Interact with clockify user data");
}
