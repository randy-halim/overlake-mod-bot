require('dotenv').config(); // expect DISCORD_TOKEN, PREFIX

const fs = require('fs');
const path = require('path');
const { client, commands, prefix } = require('./service/discord-client');
const logger = require('./service/chat-log');

console.log('loading commands from /commands/ ...');
const commandFiles = fs.readdirSync(`${__dirname}/commands/`);
commandFiles.forEach(file => {
	const command = require(`${__dirname}/commands/${file}`);
	console.log(`loading ${prefix}${command.meta.name} ...`);
	commands.set(command.meta.name, command);
});
console.log('commands loaded!');

console.log('loading events from /events/ ...');
const eventFiles = fs.readdirSync(`${__dirname}/events/`);
eventFiles.forEach(file => {
	const event = path.parse(file).name;
	console.log(`loading event ${event} ...`);
	client.on(event, require(`${__dirname}/events/${file}`));
});
console.log('events loaded!');

logger.begin();

client.login(process.env.DISCORD_TOKEN);