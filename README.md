# overlake-mod-bot
A moderation and management bot for Overlake's Discord server

# to do
- [x] start documentation
- [ ] auto role reassignment
- [x] audit message creation
- [x] audit message edit
- [ ] audit message deletion
- [ ] configure log to be 'archived' every so often to prevent log overwrite every time the bot starts
- [ ] beautify logging of bot actions
- [ ] clean up code

# checkout and test
Clone this repository to your computer:
```sh
git clone https://github.com/randy-halim/overlake-mod-bot.git
```
(or use your preferred method of cloning a repo).

Install required packages:
```sh
yarn install
```

Create a `.env` file (enviroment file) inside `container-data` using the following code below. Replace the `DISCORD_TOKEN` with your bot's API key.
```txt
DISCORD_TOKEN=YOUR_SECRET_BOT_KEY_HERE
COMMAND_PREFIX=!
```

Run `node`:
```sh
node .
```
You should see a message that says `Ready!` if successful.
