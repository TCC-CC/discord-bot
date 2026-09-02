# discord.js bot template

A minimal Discord bot that logs in and goes online. Nothing else.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/al007ex/hello-discord)

Click the badge to run it in your browser. Node, the dependencies, and your `.env`
file are all set up for you, so you can skip straight to pasting your token.

### Helpful Resources
* [Node.js](https://nodejs.org/en/download) — Download and install Node.js
* [Discord Developer Portal](https://discord.com/developers/applications) — Create and manage your Discord application and bot

### 📖 Documentation & Guides

* [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — Learn JavaScript fundamentals
* [Discord.js Guide](https://discordjs.guide/legacy) — Learn how to build Discord bots with Discord.js

first make sure nodejs is installed:
```bash
node -v
```

if not, download and install it from the [official website](https://nodejs.org/en/download/).

then, install the dependencies:
```bash
npm install
```

copy the .env.example file to .env and fill in your bot token:
```bash
cp .env.example .env
```
your .env file should look like this:
```
DISCORD_TOKEN="yourtokenhere"
```

then, run the bot:
```bash
npm start
```

