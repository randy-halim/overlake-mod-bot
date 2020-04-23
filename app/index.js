global.__rootdir = __dirname;

// Read environment variables for development
require('dotenv').config();

const fs = require('fs');
const path = require('path');

const logger = require(__rootdir + '/util/logger.js');
const { client, commands } = require(__rootdir + '/util/client-wrapper.js');

// Dynamically load commands
const commandFiles = fs.readdirSync(__rootdir + '/commands/');
for (const file of commandFiles) {
    const command = require(path.join(__rootdir, 'commands', file));
    commands.set(command.name, command);
}

// Setup event handler synchronously by parsing each .js file in ../app/events/
const eventFiles = fs.readdirSync(__rootdir + '/events/');
for (const file of eventFiles) {
    const event = path.parse(file).name;
    client.on(event, require(path.join(__rootdir, 'events', file)));
}

// Begin periodic logging
logger.begin();

// Login Discord bot
client.login(process.env.DISCORD_TOKEN);
