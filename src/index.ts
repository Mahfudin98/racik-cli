#!/usr/bin/env bun
import { commands } from "./commands";

const [, , commandName, arg] = process.argv;

const command = commands[commandName];

if (!command) {
  console.log("Unknown command:", commandName);
  console.log("");
  console.log("Available commands:");

  for (const [name, cmd] of Object.entries(commands)) {
    console.log(`  ${name.padEnd(18)} ${cmd.description}`);
  }

  process.exit(1);
}

command.run(process.argv.slice(3));
