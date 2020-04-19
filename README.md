# overlake-mod-bot
A moderation and management bot for Overlake's Discord server

# to do
- [x] start documentation
- [] auto role reassignment
- [x] audit message creation
- [x] audit message edit
- [] audit message deletion
- [] configure log to be 'archived' every so often to prevent log overwrite every time the bot starts
- [] beautify logging of bot actions
- [] clean up code

# checkout and test
Clone this repositry to your computer:
```bash
git clone https://github.com/randy-halim/overlake-mod-bot.git
```
(or use your preferred method of cloning a repo).

Install required packages using your package manager (for example, npm):
```bash
npm install
```

Create a `.env` file (enviroment file) using the following code below. Replace the `discordAPIKey` with your bot's API key.
```txt
discordAPIKey=YOUR_SECRET_BOT_KEY_HERE
commandPrefix=!
```

`cd` to the root level of the repo, and run `node`:
```bash
node .
```
You should see a message that says `Ready!` if successful.
Code away!
