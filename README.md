# WhatsApp TagAll Bot

A lightweight WhatsApp group "tag all" bot that helps admins mention all group members quickly. This repository contains a Node.js bot that can be run with a WhatsApp Web API library (for example, Baileys or whatsapp-web.js). Use this README to get the bot running and customize it for your deployment.

## Features

- Mention/tag all members in a group with a single command
- Configurable command prefix and admin-only mode
- Simple setup for local or VPS deployment

## Requirements

- Node.js 16+ (or the version required by your chosen WhatsApp library)
- npm or yarn
- A WhatsApp account to connect the bot (via a supported WhatsApp Web API library)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/krish12388/whatsapp-tagall-bot.git
cd whatsapp-tagall-bot
```

2. Install dependencies:

```bash
npm install
# or
# yarn install
```

3. Create a configuration file

Copy the example env/config or create a `.env` in the project root. At minimum, add the values described below.

Example `.env` (update values for your environment):

```env
# Bot configuration
BOT_NUMBER=+1234567890       # phone number or identifier for the bot account (optional)
OWNER_NUMBER=+19876543210    # your WhatsApp number (for admin-only controls)
PREFIX=!                     # command prefix (e.g. !, /, .)
ADMIN_ONLY=true              # if true, only group admins can run tag-all

# Library/session
SESSION_PATH=./session.json  # path where the WhatsApp session data will be stored
```

4. Start the bot

```bash
npm start
# or
# node index.js
```

Follow the console output to scan the WhatsApp QR code (if your chosen library requires it). Once connected, the bot will join groups where the account is invited.

## Usage

Common commands (prefix described in `.env`):

- `!tagall` — Mention all group members (or replace `!` with your configured prefix)
- `!help` — Show available commands and usage information

Notes:
- Depending on the WhatsApp API library you use, the exact filenames and command names may vary. Adjust the commands and invocation to match the code in this repository.
- Some libraries limit the number of mentions or message formatting; test in small groups first.

## Configuration and Customization

- Change the command prefix or admin-only behavior in the `.env` file.
- Add/modify commands in your command handler file (commonly `index.js`, `bot.js`, or a `commands/` folder).
- To persist sessions across restarts, enable the session storage mechanism used by your WhatsApp library and point `SESSION_PATH` at a writable file/directory.

## Deployment

For production, run the bot behind a process manager (pm2, systemd) and on a machine that stays online.

Example with pm2:

```bash
npm install -g pm2
pm start
# or
pm2 start index.js --name whatsapp-tagall-bot
```

Backup the session file regularly to avoid re-scanning QR codes after crashes or migrations.

## Troubleshooting

- If the bot frequently disconnects, check network stability and that the phone/account is allowed.
- If mentions don't work, verify the library supports mentions and that your message formatting is correct.
- Inspect logs (console or pm2 logs) for errors and stack traces.

## Contributing

Contributions are welcome. Open an issue to discuss changes or send a pull request with a clear description of the change and tests where applicable.

Guidelines:
- Keep commits focused and atomic
- Update README or docs for every breaking or new feature

## License


---
