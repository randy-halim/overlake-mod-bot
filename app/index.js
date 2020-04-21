global.__rootdir = __dirname;
// Read environment variables
require('dotenv').config();

const fs = require('fs');
const path = require('path');

const logger = require(__rootdir + '/util/logger.js');
const client = require(__rootdir + '/util/client.js');

// Setup event handler synchronously
const files = fs.readdirSync(__rootdir + '/events/');
for (const file of files) {
    const event = path.parse(file).name;
    client.on(event, require(path.join(__rootdir, 'events', file)));
}

// Begin periodic logging
logger.begin();
client.login(process.env.DISCORD_TOKEN);
