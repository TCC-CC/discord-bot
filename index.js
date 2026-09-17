import { RegisterCommands } from './onDeploy.js'
import { Client, Events, GatewayIntentBits, Collection, MessageFlags } from 'discord.js';
import fs from 'fs'
import path from 'path'

const COMMANDS_TOP_DIR = path.join(import.meta.dirname, 'commands')

await RegisterCommands(COMMANDS_TOP_DIR)

const client = new Client({
  intents: [GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
  ],
});

client.commands = new Collection();

for (const commandDir of fs.readdirSync(COMMANDS_TOP_DIR)) {
  const commandPath = path.join(COMMANDS_TOP_DIR, commandDir);
  const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

  for (const commandFile of commandFiles) {
    const {default: command} = await import(path.join(commandPath, commandFile))
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    } else {
      console.warn(`Command at ${path.join(commandPath, commandFile)} is missing data export or execute function`)
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
  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName}`)
    return
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err)
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'Error while executing',
        flags: MessageFlags.Ephemeral
      })
    } else {
      await interaction.reply({
        content: 'Error while executing',
        flags: MessageFlags.Ephemeral
      })
    }
  }
})

// Never paste it directly into this file //opsec level: api keys in prod
client.login(process.env.DISCORD_TOKEN);
