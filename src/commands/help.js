const { commands, prefix } = require("../service/discord-client");

module.exports = {
	meta: {
		name: 'help',
		description: 'Get descriptions and usages of commands',
		usage: ''
	},
	run: (message) => {
		const embed = {
			title: 'Commands',
			fields: []
		};
		commands.forEach(command => {
			const value = command.meta.description;
			const name = `${prefix}${command.meta.name} ${command.meta.usage}`
			embed.fields.push({ name, value });
		});
		message.channel.send({ embed });
	}
};