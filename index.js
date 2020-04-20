global.__rootdir = __dirname;
// Read environment variables
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');
const logger = require(__rootdir + '/util/logger.js');

const prefix = process.env.COMMAND_PREFIX;

// Begin logging stream
logger.init();

// Setup event handler synchronously 
const files = fs.readdirSync('./events/')
for (const file of files) {
    const event = path.parse(file).name;
    client.on(event, require(path.join(__rootdir, 'events', file)));
}

const moment = require('moment');

(async () => {
    let data;
    try {
        data = await fs.promises.readFile('./log/latest.txt')
    } catch (err) {
        console.error(err);
        return;
    }
    const timestamp = moment().format();
    try {
        await fs.promises.writeFile(`./log/${timestamp}.txt`, data);
        await fs.promises.writeFile('./log/latest.txt', null);
    } catch (err) {
        console.error(err);
        return;
    }
    console.log(`log has been dumped into ./log/${timestamp}`);
})();

client.login(process.env.DISCORD_TOKEN);
