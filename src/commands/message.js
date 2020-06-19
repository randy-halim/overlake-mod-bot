const { client } = require("../service/discord-client");

const categoryId = process.env.MESSAGES_CHANNEL_ID;
module.exports = {
	meta: {
		name: 'message',
		description: 'Begin a \'private\' message between specified members',
		usage: '**[mentions of members...]**'
	},
	run: (message) => {
		const members = new Map();
		const mentions = message.mentions;

		mentions.members.forEach((guildMember, id) => {
			members.set(id, guildMember.user);
		});
		members.set(message.author.id, message.author);

		if (members.size < 2) {
			message.channel.send('Please mention **one or more** members');
			return;
		}

		const permissions = [{
			id: message.guild.roles.everyone,
			deny: ['VIEW_CHANNEL']
		}];

		members.forEach((guildMember, id) => {
			permissions.push({
				id,
				allow: ['VIEW_CHANNEL']
			});
		});

		const channelName = Math.random().toString().substr(2, 10);
		message.guild.channels.create(channelName, {
			type: 'text',
			topic: 'helpful text lives here',
			parent: categoryId,
			permissionOverwrites: permissions
		});

		message.react('👍');
	}
};