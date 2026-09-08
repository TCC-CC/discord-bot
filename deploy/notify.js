const res = await fetch(
  `https://discord.com/api/v10/channels/${process.env.LOG_CHANNEL_ID}/messages`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: process.argv[2],
      allowed_mentions: { parse: [] },
      flags: 4,
    }),
  },
);

if (!res.ok) {
  console.error(`notify failed: ${res.status} ${await res.text()}`);
  process.exit(1);
}
