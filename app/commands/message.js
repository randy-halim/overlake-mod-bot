const { prefix, commands } = require(__rootdir + '/util/client-wrapper.js');

// This belongs in config
const categoryId = '709952882052563016';
module.exports = {
    name: 'message',
    desc: 'Begin a private message channel',
    usage: '',
    run: (message) => {
        const members = new Map();
        const mentions = message.mentions;

        mentions.members.forEach((guildMember, id) => {
            members.set(id, guildMember.user);
        });

        members.set(message.author.id, message.author); 

        if (members.size < 2) {
            message.channel.send('Please mention one or more members');
            return;
        }

        const permissions = [
            {
                id: message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            }
        ]

        members.forEach((guildMember, id) => {
            permissions.push({
                id,
                allow: ['VIEW_CHANNEL']
            });
        });

        const name = Math.random().toString().substr(2, 10);
        message.guild.channels.create(name, {
            type: 'text',
            parent: categoryId,
            permissionOverwrites: permissions
        });
    },
};
