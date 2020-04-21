global.__rootdir = __dirname;
// Read environment variables
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');
const logger = require(__rootdir + '/util/logger.js');

// Begin logging stream
logger.init();

// Setup event handler synchronously
const files = fs.readdirSync(__rootdir + '/events/');
for (const file of files) {
    const event = path.parse(file).name;
    client.on(event, require(path.join(__rootdir, 'events', file)));
}

client.login(process.env.DISCORD_TOKEN);
