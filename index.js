// A Discord bot, in about eight real lines.
//
// The bot account already exists (you made it in the Developer Portal).
// This file is the program that logs into it and keeps it online.

import { Client, Events, GatewayIntentBits } from 'discord.js';

// "Intents" tell Discord which events you want to receive.
// Guilds is the bare minimum and is NOT a privileged intent,
// so there's nothing to toggle in the portal to make it work.
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Fires once, when the login succeeds and the bot goes green.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
  console.log(`Watching ${readyClient.guilds.cache.size} server(s)`);
});

// The token comes from .env, which is gitignored.
// Never paste it directly into this file.
client.login(process.env.DISCORD_TOKEN);
