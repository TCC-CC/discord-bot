import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const COMMAND_FOLDERS_DIR = require('../config.jsonc').COMMAND_FOLDERS_DIR;

const { REST, Routes } = require('discord.js');
const token = process.env.DISCORD_TOKEN;

const commands = [];

const commandFolders = fs.readdirSync(COMMAND_FOLDERS_DIR);

try { // only update changed commands
  const diffOutput = execSync('git diff --name-only HEAD origin/main -- ' + COMMAND_FOLDERS_DIR);
  const changedFiles = diffOutput.toString().split('\n').filter(Boolean);

} catch (error) {
  console.error(error);
}

for (const file of changedFiles) {
  const commandPath = path.join(COMMAND_FOLDERS_DIR, file);
  const command = require(commandPath);

  if (command.data && command.execute) {
    commands.push(command);
  } else {
    console.warn(`${commandPath} Missing required data property or execute function exports`); // malformed command
  }
}

const rest = new REST().setToken(token);

try {
  await rest.put(Routes.applicationCommands(), { body: commands });
} catch (error) {
  console.error(error);
}
