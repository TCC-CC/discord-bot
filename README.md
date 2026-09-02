# Discord Bot Starter

Get your own Discord bot online. No installing anything.

By the end of this you'll have a bot sitting in your own Discord server with a
green "online" dot next to its name, running code you control.

---

## Step 0 — Open this in a Codespace

Click the green **Code** button at the top of this repo → **Codespaces** tab →
**Create codespace on main**.

That gives you VS Code in your browser with Node already installed. It'll spend
a minute installing dependencies. Leave it running and do Step 1 while you wait.

## Step 1 — Make your own Discord server

In Discord, click the **+** at the bottom of your server list →
**Create My Own** → **For me and my friends** → give it any name.

You need to be the owner of a server to add a bot to it, so everyone makes their
own. Takes twenty seconds.

## Step 2 — Create the bot account

Go to <https://discord.com/developers/applications>.

1. **New Application** (top right) → name it → agree to the terms → **Create**
2. **Bot** in the left sidebar
3. **Reset Token** → **Yes, do it!** → **Copy**

Paste the token somewhere temporary for a second. **Discord only shows it once.**
If you lose it, just hit Reset Token again and get a new one.

> This token is the bot's password. Anyone who has it can control your bot.
> Don't paste it in chat, don't put it in your code, don't commit it.

## Step 3 — Invite the bot to your server

Still in the Developer Portal:

1. **OAuth2** in the left sidebar
2. Scroll to **Scopes**, tick **`bot`**
3. Under **Bot Permissions**, tick **Send Messages** and **Read Message History**
   (that's plenty — never tick Administrator)
4. Copy the **Generated URL** at the bottom, open it in a new tab
5. Choose the server you made in Step 1 → **Authorize**

Go look at your server's member list. The bot is there, **greyed out**.

It exists, but nothing is running it. That's what the next step fixes.

## Step 4 — Give your code the token

Back in your Codespace, open the **`.env`** file (it was created for you).

Replace `paste_your_token_here` with the token you copied:

```
DISCORD_TOKEN=MTIzNDU2Nzg5...
```

No quotes. No spaces around the `=`. Save with `Ctrl+S` / `Cmd+S`.

## Step 5 — Run it

In the terminal at the bottom of the Codespace:

```bash
npm start
```

You should see:

```
Logged in as YourBot#1234
Watching 1 server(s)
```

Check Discord. **The dot is green.** That's your code holding the connection open.

Press `Ctrl+C` in the terminal. Watch it go grey again. That's the whole idea:
a bot is just a program that stays connected.

---

## When it doesn't work

**`An invalid token was provided`**
You almost certainly copied the wrong thing. The Application ID and the Public
Key are *not* the token. Go back to the **Bot** tab, hit Reset Token, copy that.
Also check for a stray space or quote marks in `.env`.

**`Cannot use import statement outside a module`**
`package.json` is missing `"type": "module"`. It's there in this repo, so this
means you're running a file outside the project folder.

**`Used disallowed intents`**
Something in your code asks for a privileged intent. The starter code doesn't,
but if you copied `MessageContent` from a tutorial, go to the Developer Portal →
**Bot** → scroll to **Privileged Gateway Intents** → toggle it on.

**Bot is online but not in my server**
You skipped Step 3, or authorized it into the wrong server. Re-run the invite URL.

**`command not found: node`**
You're not in the Codespace terminal. Look at the bottom panel of the browser tab.

---

## What's next

Right now the bot connects and does nothing else. The obvious next step is
**slash commands**, which is a whole meeting on its own.

The real documentation is <https://discordjs.guide/>. It's genuinely good.
# hello-discord
