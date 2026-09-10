//Commands go in sub folders of categories. ie:
// commands/admin/WarnUser.js

//Each subfolder has its own permissions set in permissions.json ie:
// commands/admin/Permissions.json
//Leaves room to still set per command permissions but inherits permissions from the folder, for safety :3

import { Client, Events, GatewayIntentBits } from 'discord.js';

const COMMAND_FOLDERS_DIR = require('./config.jsonc').COMMAND_FOLDERS_DIR;

import fs from 'fs';
import path from 'path';

const client = new Client({
  intents: [GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
  ],
});

client.commands = new Collection();

for (const file of fs.readdirSync(COMMAND_FOLDERS_DIR)) {

  const commandPath = path.join(COMMAND_FOLDERS_DIR, file);
  const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('.js'));
  const dirPermissions = require(path.join(commandPath, 'Permissions.json'))

  for (const commandFile of commandFiles) {

    const filePath = path.join(commandPath, commandFile);
    const command = require(filePath);

    if (command.data && command.execute) {
      client.commands.set(command.data.name, { ...command, dirPermissions: dirPermissions });
    } else {
      console.warn(`${filePath} Missing required data property or execute function exports`); // malformed command
    }
  }
}

// Fires once, when the login succeeds and the bot goes green
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return; // Ignore messages from bots

  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'Error while executing: ' + error.message,
        ephemeral: true
      })
    } else {
      await interaction.reply({
        content: 'Error while executing: ' + error.message,
        ephemeral: true
      })
    }
  }

});

// Never paste it directly into this file //opsec level: api keys in prod
client.login(process.env.DISCORD_TOKEN);
