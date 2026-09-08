import { Client, Events, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
  ],
});

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

// Never paste it directly into this file
client.login(process.env.DISCORD_TOKEN);
