import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";

const rest = new REST().setToken(process.env.DISCORD_TOKEN)

export async function RegisterCommands(TopDir) {
  const commands = [];
  for (const commandFolder of fs.readdirSync(TopDir)) {
    const commandPath = path.join(TopDir, commandFolder);
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

    for (const commandFile of commandFiles) {
      const command = await import(path.join(commandPath, commandFile));

      if ('data' in command.default) {
        commands.push(command.default.data.toJSON());
      }
    }
  }
  try {
    console.info('Registering Commands...')
    const data = await rest.put(Routes.applicationCommands(process.env.DISCORD_ID), { body: commands })
    console.info(`Success?`)
  }
  catch(err) {
    console.warn("Command registering failed with:")
    console.error(err)
  }
}
