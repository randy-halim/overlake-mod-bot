const logger = require('../service/chat-log');
const { prefix, commands } = require('../service/discord-client');

module.exports = (message) => {
	logger.log(`${message.member.displayName} in channel ${message.channel} at ${Date()}:\n${message.content}\n\n`);
	if (!(message.content.startsWith(prefix))) return;
	const command = message.content.split(' ')[0].substring(1);
	if (!(commands.has(command))) return;
	commands.get(command).run(message);
}