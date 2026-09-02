# Presenter notes

Not for the audience. Delete this file before you share the repo if you'd rather
they didn't see it.

## Send this before the meeting

> Bring a laptop. Before Thursday, make sure you have:
> 1. A Discord account with a **verified email** (check your inbox for the
>    verification link if you're not sure)
> 2. A **GitHub account** — github.com/signup, takes two minutes
>
> If you show up without these you'll spend the whole hour making accounts
> instead of building a bot.

Account creation is the single biggest time sink. Chase people about this.

## Pre-flight, ideally on the venue wifi

- [ ] `discord.com` and `github.com` both load on a school machine
- [ ] `discord.com/developers` specifically loads (sometimes blocked separately)
- [ ] Run the whole flow yourself on a throwaway account, start to finish
- [ ] Have a phone hotspot ready as a backup
- [ ] Recruit **two helpers** to roam. You cannot present and debug 20 laptops.
- [ ] Your own demo bot running on the VPS, already online

## Rough timing (50 min)

| Time | What |
|---|---|
| 0–5 | What a bot actually is: a program with a password that holds a connection open |
| 5–8 | Everyone creates their own Discord server |
| 8–18 | Developer Portal: application → bot → token → OAuth invite URL |
| 18–20 | **Everyone's bot is in their server, greyed out.** Pause here. Land it. |
| 20–25 | Open Codespace, read `index.js` together, paste token |
| 25–30 | `npm start`. Green dot. Let people be excited. |
| 30–40 | Buffer. There will be stragglers. This block is not optional. |
| 40–50 | VPS demo, `pm2`, what's next |

## Slide advice

Screenshot **every single click** in the Developer Portal. That UI changes and
it's where people get lost. Verbal instructions are not enough for that part.

## The two moments that matter

1. **Grey bot in the member list.** "It exists. Nothing is running it."
2. **`Ctrl+C` and it goes grey again.** Do this live. It's the whole concept in
   one keystroke, and it's more memorable than any explanation.

## The VPS bit

Have your bot already running there via `pm2` or systemd. Close your laptop lid
on stage. "Mine's been up for four days."

```bash
npm install -g pm2
pm2 start "node --env-file=.env index.js" --name clubbot
pm2 save
pm2 startup
```

Don't try to get 20 people onto the VPS during the session. Codespaces handles
the classroom; the VPS is your closing demo and the hook for next meeting.

## Rules that save you

- **Whoever finishes first helps the person next to them.** Say this out loud early.
- Anyone hopelessly stuck: have them read `index.js` and pair up rather than
  restarting from scratch.
- If someone's token leaks on a screenshare, have them hit Reset Token
  immediately. Make it a teaching moment, not an embarrassment.
