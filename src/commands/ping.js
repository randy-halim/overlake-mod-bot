
module.exports = {
	meta: {
		name: 'ping',
		description: 'Pings the bot (and ensure everything works)',
		usage: ''
	},
	run: (message) => {
		message.reply(`pong! \n\`\`\`Time: ${Date()}\`\`\``);
	}
}